'use strict';

/**
 * UserInfo reducer
 *
 * Updates the userInfo portion of the Redux state of the application based on
 * the action dispatched by the application.
 *
 * @export userInfo
 */

// Import dependencies
import ActionTypes from '../../../constants/actionTypes.js';

/**
 * UserInfo reducer
 *
 * Accepts the current userInfo Redux state and the return value of the
 * dispatched action, and makes changes to the Redux state by copying the state
 * and making necessary changes to it based on on the data returned from the
 * dispatched action. Makes a copy of the current state rather than mutating it
 * so that the history of the state is always accessible. Handles the different
 * types of dispatched actions with a switch case with the default case returning
 * the current userInfo Redux state of the application.
 *
 * @param {Object} $state - The current userInfo Redux state.
 * @param {Boolean} $state.loggedIn - Current state of whether user is logged in.
 * @param {String} $state.successMessage - Current log in or log out success message.
 * @param {Object} $state.user - Current user information.
 * @param {String} $state.user.username - Current username.
 * @param {String} $state.user.password - Current password.
 * @param {String} $state.user.token - Current token.
 * @param {Object} $state.errors - Error information about the userInfo state.
 * @param {Object} $action - The returned value of the dispatched action.
 * @param {String} $action.type - Action type.
 * @param {Object} $action.error - Error information about the userInfo state.
 * @param {String} $action.error.message - Message summarizing the error.
 * @param {String} $action.error.user - Specific error message related to the username.
 * @param {String} $action.error.password - Specific error message related to the password.
 * @param {Boolean} $action.loggedIn - State of whether user is logged in.
 * @param {Object} $action.user - Updated user information.
 * @param {String} $action.user.username - Updated username.
 * @param {String} $action.user.password - Update password.
 * @param {String} $action.user.token - Updated token.
 *
 * @return - Updated userInfo Redux state object.
 */
const userInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        errors: {},
        loggedIn: action.loggedIn,
        successMessage: action.successMessage,
        user: {
          username: action.user.username,
          password: action.user.password,
          token: action.user.token
        }
      });
    case ActionTypes.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.error,
        loggedIn: action.loggedIn,
        successMessage: '',
        user: {
          username: action.user.username,
          password: action.user.password,
          token: ''
        }
      });
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        errors: {},
        loggedIn: action.loggedIn,
        successMessage: action.successMessage,
          user: {
            username: '',
            password: '',
            token: ''
          }
      });
    case ActionTypes.LOGOUT_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.error,
        loggedIn: action.loggedIn,
        successMessage: ''
      });
    case ActionTypes.UPDATE_USERNAME:
      return Object.assign({}, state, {
        user: {
          username: action.user.username,
          password: state.user.password,
          token: action.user.token
        }
      });
    case ActionTypes.UPDATE_PASSWORD:
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          password: action.user.password,
          token: action.user.token
        }
      });
    case ActionTypes.SET_TOKEN:
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          password: state.user.password,
          token: action.token
        }
      });
    case ActionTypes.REMOVE_TOKEN:
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          password: state.user.password,
          token: ''
        }
      });
    default:
      return state;
  }
};

// Set the export for the module
export default userInfo;
