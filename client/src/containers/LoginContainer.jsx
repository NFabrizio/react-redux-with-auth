import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from '../modules/Auth';
import {
  loginUserSuccess,
  loginUserFailure,
  updateUser
} from '../actions/index.js';
import LoginForm from '../components/LoginForm.jsx';

class LoginContainer extends React.Component {
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

    this.loginSubmit = this.loginSubmit.bind(this);
    this.changeUserData = this.changeUserData.bind(this);
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

    const username = encodeURIComponent(this.props.userInfo.user.username);
    const password = encodeURIComponent(this.props.userInfo.user.password);
    const formData = `username=${username}&password=${password}`;

    // create an AJAX request
    const request = new XMLHttpRequest();
    request.open('post', '/auth/login');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.responseType = 'json';
    request.addEventListener('load', () => {

      if (request.status === 200) {
        // success

        Auth.authenticateUser(request.response.token);

        // change the component-container state
        this.props.success(this.props.userInfo.user);

        this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = request.response.errors ? request.response.errors : {};
        errors.summary = request.response.message;

        // Error occurred setting up the request
        console.log(errors.summary);

        this.props.failure(this.props.userInfo.user, errors);
      }
    });
    request.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUserData(event) {
    const field = event.target.name;
    const user = Object.assign({}, this.props.userInfo.user);
    user[field] = event.target.value;

    this.props.updateUser(this.props.userInfo.user, user);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.loginSubmit}
        onChange={this.changeUserData}
        errors={this.props.userInfo.errors}
        successMessage={this.props.userInfo.successMessage}
        user={this.props.userInfo.user}
      />
    );
  }
}

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    success: (user) => {
      dispatch(loginUserSuccess(user));
    },
    failure: (user, errors) => {
      dispatch(loginUserFailure(user, errors));
    },
    updateUser: (currentUser, newUser) => {
      dispatch(updateUser(currentUser, newUser));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
