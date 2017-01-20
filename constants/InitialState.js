'use strict';

/**
 * Initial state object for the application
 *
 * This sets up the initial Redux state object for the application so that references
 * to state elements are not undefined when the application first loads.
 *
 * @export InitialState
 */
const InitialState = {
  userInfo: {
    errors: {},
    loggedIn: false,
    successMessage: '',
    user: {
      username: '',
      password: '',
      token: ''
    }
  },
  serverInfo: {
    appPath: '',
    dateTime: '',
    errors: {},
    nodeVersion: '',
    requestSuccess: false
  }
};

// Set the export for the module
module.exports = InitialState;
