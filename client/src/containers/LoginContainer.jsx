/**
 * Login container component
 *
 * Renders the LoginForm component and passes it the necessary props and methods.
 * Sets up the HTTP request to the /auth/login endpoint for user login
 * authentication and dispatches the Redux actions to update the state
 * appropriately. Uses the connect function to map the state and actions to props
 * for use inside the component.
 *
 * @parent /client/src/app.jsx
 *
 * @export LoginContainer
 */

// Import dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Auth from '../modules/Auth';
import {
  loginUserSuccess,
  loginUserFailure,
  updateUser
} from '../actions/index.js';
import LoginForm from '../components/LoginForm.jsx';

/**
 * Login container class
 *
 * Pulls in the props from the parent component, sets up the handlers for submitting
 * the login form and making changes to the input fields and binds those handlers
 * to the this object of the component. Renders the LoginForm component.
 *
 * @return - HTML elements.
 */
class LoginContainer extends React.Component {
  /**
   * Class constructor
   *
   * Sets up the props to be passed in from the parent component and binds the
   * loginSubmit and changeUserData handlers to the this object of the component.
   *
   * @see super()
   * @see loginSubmit()
   * @see changeUserData()
   *
   * @return null
   */
  constructor(props) {
    super(props);

    // Bind the methods to the this object of the component
    this.loginSubmit = this.loginSubmit.bind(this);
    this.changeUserData = this.changeUserData.bind(this);
  }

  /**
   * Login submit handler
   *
   * Handles the login form submission event. Stops the default action so that the
   * page does not reload. Cleanses the form data by URI encoding it. Makes an HTTP
   * request to the /auth/login endpoint to see if the username and password are
   * valid login credentials. If the credentials are valid, a token is returned
   * and it is added to the user object, then the loginUserSuccess action is
   * dispatched and the user is redirected to the dashboard page. If the
   * credentials are not valid, errors are returned, and the loginUserFailure
   * action is dispatched.
   *
   * @see preventDefault()
   * @see encodeURIComponent()
   * @see XMLHttpRequest()
   * @see XMLHttpRequest().open()
   * @see XMLHttpRequest().setRequestHeader()
   * @see XMLHttpRequest().addEventListener()
   * @see XMLHttpRequest().send()
   * @see success()
   * @see replace()
   * @see failure()
   *
   * @param {Object} $event - JavaScript event object created on form submission.
   *
   * @return null
   */
  loginSubmit(event) {
    event.preventDefault();

    // Set this to a new variable to avoid issues with using this
    const here = this;

    // Cleanse form data
    const username = encodeURIComponent(this.props.userInfo.user.username);
    const password = encodeURIComponent(this.props.userInfo.user.password);
    const formData = `username=${username}&password=${password}`;

    // create an HTTP request for user authentication
    const request = new XMLHttpRequest();
    request.open('post', '/auth/login');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.responseType = 'json';

    // Add a listener for response from server
    request.addEventListener('load', () => {
      if (request.status === 200) {
        // Success

        // Add the authentication token to the user object
        this.props.userInfo.user.token = request.response.token;

        // Dispatch the success action to update the Redux state
        this.props.success(this.props.userInfo.user);

        // Redirect the user to the main page
        this.context.router.replace('/');
      } else {
        // Failure

        // Update the errors object with any error messages returned from the server
        const errors = request.response.errors ? request.response.errors : {};
        errors.summary = request.response.message;
        console.log(errors.summary);
        console.log(errors);

        // Dispatch the failure action to update the Redux state
        this.props.failure(this.props.userInfo.user, errors);
      }
    });

    // Send the request to the server
    request.send(formData);
  }

  /**
   * Change user data handler
   *
   * Makes a copy of the Redux state user object, and adds or changes the event
   * target name and value to the user object. Then, dispatches the updateUser
   * action to update the Redux state.
   *
   * @see Object.assign()
   * @see updateUser()
   *
   * @param {Object} $event - JavaScript event object created on input field change.
   * @param {String} $event.target.name - Name of the field targeted with the event.
   * @param {String} $event.target.value - Value of the field when the event was fired.
   *
   * @return null
   */
  changeUserData(event) {
    // Make a copy of the Redux state user object
    const user = Object.assign({}, this.props.userInfo.user);
    const field = event.target.name;
    user[field] = event.target.value;

    // Dispatch the updateUser action to update the Redux state
    this.props.updateUser(this.props.userInfo.user, user);
  }

  /**
   * Render the LoginForm presentational component
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

/**
 * Defines and validates the context for the component
 *
 * Gives the component access to the router prop passed in from React router and
 * allows the component access to the push method from browserHistory. Validates
 * that the router context exists and is an object. Ensures that the router
 * context is required for this component.
 */
LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Maps the Redux state to props
 *
 * This function defines and returns the pieces of the Redux state for use inside
 * this component. It accepts the existing state object and defines a new object
 * that will be accessible through the component props.
 *
 * @param {Object} $state - The current Redux state of the application.
 * @param {Object} $state.userInfo - Object containing information about the
 *                                    currently logged in user.
 *
 * @return {Object} - Object containing the desired pieces of the Redux state.
 */
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

/**
 * Maps the dispatch methods to props
 *
 * Creates methods that dispatch Redux actions when called inside the component.
 * Each of the dispatched functions are imported from the action creators.
 *
 * @see dispatch()
 * @see loginUserSuccess()
 * @see logoutUserFailure()
 * @see loginUserFailure()
 * @see updateUser()
 *
 * @param {Function} $dispatch - The dispatch function made available through Redux.
 *
 * @return {Object} - Object containing methods for dispatching Redux actions.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    success: (user) => {
      dispatch(loginUserSuccess(user));
      //dispatch(setToken(token));
    },
    failure: (user, errors) => {
      dispatch(loginUserFailure(user, errors));
    },
    updateUser: (currentUser, newUser) => {
      dispatch(updateUser(currentUser, newUser));
    }
  };
};

/**
 * Export the Logout component
 *
 * Connect the Logout component to the state and dispatch methods and make them
 * available inside the component as props and then export the LoginContainer component.
 *
 * @see connect()
 *
 * @param {Object} $mapStateToProps - Object containing the desired pieces of
 *                                     the Redux state.
 * @param {Object} $mapDispatchToProps - Object containing methods for
 *                                        dispatching Redux actions.
 */
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
