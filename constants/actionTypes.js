'use strict';

/**
 * Set up the action types
 *
 * Put all the action types in one place and export them for use in other places
 * in the application. This will make it easier to add new actions in the future
 * without accidentally repeating any. It will also help keep naming conventions
 * the same.
 *
 * @parent /client/source/actions/index.js
 * @parent /client/src/reducers/serverInfo.js
 * @parent /client/src/reducers/userInfo.js
 * @parent /tests/redux/ActionTests.js
 * @parent /tests/redux/ReducerTests.js
 *
 * @export ActionTypes
 */

// Set up constants for action types
const ActionTypes = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_FAILURE: 'LOGOUT_USER_FAILURE',
  UPDATE_USERNAME: 'UPDATE_USERNAME',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  NO_USER_CHANGE: 'NO_USER_CHANGE',
  SET_TOKEN: 'SET_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  UPDATE_SERVER_SUCCESS: 'UPDATE_SERVER_SUCCESS',
  UPDATE_SERVER_FAILURE: 'UPDATE_SERVER_FAILURE',
  SERVER_INFO_RESET: 'SERVER_INFO_RESET'
};

// Set the export for the module
module.exports = ActionTypes;
