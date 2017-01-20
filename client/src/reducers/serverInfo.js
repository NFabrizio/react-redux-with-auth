'use strict';

/**
 * ServerInfo reducer
 *
 * Updates the serverInfo portion of the Redux state of the application based on
 * the action dispatched by the application.
 *
 * @export serverInfo
 */

// Import dependencies
import ActionTypes from '../../../constants/actionTypes.js';

/**
 * ServerInfo reducer
 *
 * Accepts the current serverInfo Redux state and the return value of the
 * dispatched action, and makes changes to the Redux state by copying the state
 * and making necessary changes to it based on on the data returned from the
 * dispatched action. Makes a copy of the current state rather than mutating it
 * so that the history of the state is always accessible. Handles the different
 * types of dispatched actions with a switch case with the default case returning
 * the current serverInfo Redux state of the application.
 *
 * @param {Object} $state - The current serverInfo Redux state.
 * @param {String} $state.appPath - Server path of the application.
 * @param {String} $state.dateTime - Date-time stamp of the server request.
 * @param {String} $state.nodeVersion - Current version of Node.js on the server.
 * @param {Object} $state.errors - Error information about the serverInfo state.
 * @param {Boolean} $state.requestSuccess - Success state of the serverInfo request.
 * @param {Object} $action - The returned value of the dispatched action.
 * @param {Object} $action.type - Action type.
 * @param {String} $action.appPath - Server path of the application.
 * @param {String} $action.dateTime - Date-time stamp of the server request.
 * @param {String} $action.nodeVersion - Current version of Node.js on the server.
 * @param {Object} $action.errors - Error information about the serverInfo state.
 * @param {Boolean} $action.requestSuccess - Success state of the serverInfo request.
 *
 * @return - Updated serverInfo Redux state object.
 */
const serverInfo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SERVER_SUCCESS:
      return Object.assign({}, state, {
        appPath: action.appPath,
        dateTime: action.dateTime,
        nodeVersion: action.nodeVersion,
        requestSuccess: true
      });
    case ActionTypes.UPDATE_SERVER_FAILURE:
      return Object.assign({}, state, {
        appPath: '',
        dateTime: '',
        errors: action.error,
        nodeVersion: '',
        requestSuccess: false
      });
    case ActionTypes.SERVER_INFO_RESET:
      return Object.assign({}, state, {
        appPath: '',
        dateTime: '',
        errors: {},
        nodeVersion: '',
        requestSuccess: false
      });
    default:
      return state;
  }
};

// Set the export for the module
export default serverInfo;
