'use strict';

/**
 * Combine the reducers
 *
 * Combines the reducers into a single reducer.
 */

// Import dependencies
import { combineReducers } from 'redux';
import userInfo from './userInfo';
import serverInfo from './serverInfo';

/**
 * Application combine reducers
 *
 * Combines the userInfo and serverInfo reducers to update the Redux state
 * of the application.
 *
 * @see combineReducers()
 */
const dashApp = combineReducers({
  userInfo,
  serverInfo
});

// Set the export for the module
export default dashApp;
