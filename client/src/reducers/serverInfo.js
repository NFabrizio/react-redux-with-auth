/**
 * ServerInfo reducers
 */
// Import dependencies
import ActionTypes from '../../../constants/actionTypes.js';
// import {
//   UPDATE_SERVER_SUCCESS,
//   UPDATE_SERVER_FAILURE,
//   SERVER_INFO_RESET
// } from '../actions';

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

export default serverInfo;
