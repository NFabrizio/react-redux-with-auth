/**
 * Logout component
 *
 * Renders a simple log out link and includes a click handler that deauthenticates
 * the user, updates the Redux state and redirects the user to the login page
 * with a success message stating that they were successfully logged out.
 *
 * @parent /client/src/components/MainLayout.jsx
 *
 * @return - HTML elements
 */

// Import dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  logoutUserSuccess,
  logoutUserFailure,
  resetServerInfo
} from '../actions/index.js';

class Logout extends React.Component {
  /**
   * Class constructor
   *
   * Sets up the props to be passed in from the parent component and binds the
   * logoutHandler to the this object of the component.
   *
   * @see super()
   * @see logoutHandler()
   *
   * @return null
   */
  constructor(props) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  /**
   * logoutHandler method
   *
   * Handles dipatching the Redux actions and redirecting the user to the login page
   * upon successful log out. Called when the log out link is clicked by the user.
   *
   * @see browserHistory.push()
   *
   * @return null
   */
  logoutHandler() {
    // Dispatch the logoutSuccess and serverReset actions
    this.props.logoutSuccess();
    this.props.serverReset();

    // Redirect user to login page
    browserHistory.push('/login');
  }

  /**
   * Renders the HTML elements for the component
   */
  render() {
    return (
      <div className="top-bar-right">
        { this.props.userInfo.user.token && this.props.userInfo.user.token !== '' ? (
        <a onClick={this.logoutHandler}>Log out</a>
        ) : ''
        }
      </div>
    );
  }
};

/**
 * Defines and validates the context for the component
 *
 * Gives the component access to the router prop passed in from React router and
 * allows the component access to the push method from browserHistory. Validates
 * that the router context exists and is an object. Ensures that the router
 * context is required for this component.
 */
Logout.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Maps the Redux state to props
 *
 * This function defines and returns the pieces of the Redux state for use inside
 * this component. It accepts the existing state object and defines a new object
 * that will be accessible through the component props. Access to both of these
 * pieces of state is necessary here since the state will need to be reset once
 * the user is logged out.
 *
 * @param {Object} $state - The current Redux state of the application.
 * @param {Object} $state.userInfo - Object containing information about the
 *                                    currently logged in user.
 * @param {Object} $state.serverInfo - Object containing information about the server.
 *
 * @return {Object} - Object containing the desired pieces of the Redux state.
 */
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    serverInfo: state.serverInfo
  };
};

/**
 * Maps the dispatch methods to props
 *
 * Creates methods that dispatch Redux actions when called inside the component.
 * Each of the dispatched functions are imported from the action creators.
 *
 * @see dispatch()
 * @see logoutUserSuccess()
 * @see logoutUserFailure()
 * @see resetServerInfo()
 *
 * @param {Function} $dispatch - The dispatch function made available through Redux.
 *
 * @return {Object} - Object containing methods for dispatching Redux actions.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    logoutSuccess: () => {
      dispatch(logoutUserSuccess());
    },
    logoutFailure: (user, errors) => {
      dispatch(logoutUserFailure(user, errors));
    },
    serverReset: () => {
      dispatch(resetServerInfo());
    }
  };
};

/**
 * Export the Logout component
 *
 * Connect the Logout component to the state and dispatch methods and make them
 * available inside the component as props and then export the Logout component.
 *
 * @see connect()
 *
 * @param {Object} $mapStateToProps - Object containing the desired pieces of
 *                                     the Redux state.
 * @param {Object} $mapDispatchToProps - Object containing methods for
 *                                        dispatching Redux actions.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
