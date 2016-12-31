import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

export default class LoginContainer extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        username: '',
        password: ''
      }
    };

    this.loginSubmit = this.loginSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  loginSubmit(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const here = this;


    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;

    // create an AJAX request
    const request = new XMLHttpRequest();
    request.open('post', '/auth/login');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.responseType = 'json';
    request.addEventListener('load', () => {

      if (request.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        Auth.authenticateUser(request.response.token);

        this.context.router.replace('/');

        // console.log('The form is valid');
      } else {
        // failure

        // change the component state
        const errors = request.response.errors ? request.response.errors : {};
        errors.summary = request.response.message;

        // Error occurred setting up the request
        console.log(`An error occurred getting the server info: ${errors.summary} \n` +
          `${errors.username ? '- ' + errors.username : ''} \n` +
          `${errors.password ? '- ' + errors.password : ''} `);

        this.setState({
          errors
        });
      }
    });
    request.send(formData);

    console.log('username:', this.state.user.username);
    console.log('password:', this.state.user.password);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.loginSubmit}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }
}

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
};
