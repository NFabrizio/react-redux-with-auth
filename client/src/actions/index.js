'use strict';

/**
 * Redux actions
 *
 * Sets up the actions to send data from the application to the Redux store. All
 * of these actions are pure functions and, at the very minimum, return an object
 * containing a type.
 */

// Import action types
import ActionTypes from '../../../constants/actionTypes.js';

/**
 * Update user action
 *
 * Returns changes to username and/or password along with the appropriate action
 * type. Compares the new user data to the current user data to determine whether
 * to return changes to the data or no change.
 *
 * @param {Object} $currentUser - Current state of the user object.
 * @param {String} $currentUser.username - Current username.
 * @param {String} $currentUser.password - Current password.
 * @param {Object} $newUser - New state of the user object.
 * @param {String} $newUser.username - Current username.
 * @param {String} $newUser.password - Current password.
 *
 * @return Object containing the action type and changes to user object, if any.
 */
export const updateUser = (currentUser, newUser) => {
  if (currentUser.username !== newUser.username) {
    return {
      type: ActionTypes.UPDATE_USERNAME,
      user: {
        username: newUser.username
      }
    };
  }
  if (currentUser.password !== newUser.password) {
    return {
      type: ActionTypes.UPDATE_PASSWORD,
      user: {
        password: newUser.password
      }
    };
  }
  return {
    type: ActionTypes.NO_USER_CHANGE
  };
}

/**
 * Login user success action
 *
 * Returns changes to the userInfo object along with the LOGIN_USER_SUCCESS
 * action type.
 *
 * @param {Object} $user - Updated user object.
 * @param {String} $user.username - Username of the user.
 * @param {String} $user.password - Password of the user.
 * @param {String} $user.token - Authentication token for the user.
 *
 * @return Object containing the action type and changes to userInfo object.
 */
export const loginUserSuccess = (user) => {
  return {
    type: ActionTypes.LOGIN_USER_SUCCESS,
    loggedIn: true,
    successMessage: 'You have successfully logged in.',
    user: {
      username: user.username,
      password: user.password,
      token: user.token
    }
  };
};

/**
 * Login user failure action
 *
 * Returns changes to the userInfo object along with the LOGIN_USER_FAILURE
 * action type.
 *
 * @param {Object} $user - Updated user object.
 * @param {String} $user.username - Username of the user.
 * @param {String} $user.password - Password of the user.
 * @param {String} $error - Error object containing reasons for login failure.
 *
 * @return Object containing the action type and changes to userInfo object.
 */
export const loginUserFailure = (user, error) => {
  return {
    type: ActionTypes.LOGIN_USER_FAILURE,
    error,
    loggedIn: false,
    user: {
      username: user.username,
      password: user.password
    }
  };
};

/**
 * Logout user success action
 *
 * Returns changes to the userInfo object along with the LOGOUT_USER_SUCCESS
 * action type.
 *
 * @return Object containing the action type and changes to userInfo object.
 */
export const logoutUserSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_USER_SUCCESS,
    loggedIn: false,
    successMessage: 'You have successfully logged out.',
    user: {
      username: '',
      password: ''
    }
  };
};

/**
 * Logout user failure action
 *
 * Returns changes to the userInfo object along with the LOGOUT_USER_FAILURE
 * action type.
 *
 * @param {Object} $user - Updated user object.
 * @param {String} $user.username - Username of the user.
 * @param {String} $user.password - Password of the user.
 * @param {String} $error - Error object containing reasons for login failure.
 *
 * @return Object containing the action type and changes to userInfo object.
 */
export const logoutUserFailure = (user, error) => {
  return {
    type: ActionTypes.LOGOUT_USER_FAILURE,
    error,
    loggedIn: true,
    user: {
      username: user.username,
      password: user.password
    }
  };
};

/**
 * Update server success action
 *
 * Returns changes to the serverInfo object along with the UPDATE_SERVER_SUCCESS
 * action type.
 *
 * @param {Object} $result - Server result object.
 * @param {String} $result.path - Server path of the application.
 * @param {String} $result.date - Date-time stamp of the server request.
 * @param {String} $result.node - Current version of Node.js on the server.
 *
 * @return Object containing the action type and changes to serverInfo object.
 */
export const updateServerSuccess = (result) => {
  return {
    type: ActionTypes.UPDATE_SERVER_SUCCESS,
    appPath: result.path,
    dateTime: result.date,
    nodeVersion: result.node,
    requestSuccess: true
  };
};

/**
 * Update server failure action
 *
 * Returns changes to the serverInfo object along with the UPDATE_SERVER_FAILURE
 * action type.
 *
 * @param {Object} $error - Error object containing reasons for server update failure.
 *
 * @return Object containing the action type and changes to serverInfo object.
 */
export const updateServerFailure = (error) => {
  return {
    type: ActionTypes.UPDATE_SERVER_FAILURE,
    errors: error,
    requestSuccess: false
  };
};

/**
 * Reset server action
 *
 * Returns changes to the serverInfo object along with the SERVER_INFO_RESET
 * action type.
 *
 * @return Object containing the action type.
 */
export const resetServerInfo = () => {
  return {
    type: ActionTypes.SERVER_INFO_RESET
  };
};
