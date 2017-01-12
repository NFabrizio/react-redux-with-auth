'use strict';

/**
 * Combine the reducers
 */
// Import dependencies
import { combineReducers } from 'redux';
import userInfo from './userInfo';
import serverInfo from './serverInfo';

const dashApp = combineReducers({
  userInfo,
  serverInfo
});

export default dashApp;
