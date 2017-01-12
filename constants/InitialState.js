'use strict';

/**
 * Initial state object for the application
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

module.exports = InitialState;
