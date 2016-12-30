import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';

export default class LoginPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
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
        user={this.state.user}
      />
    );
  }
}
