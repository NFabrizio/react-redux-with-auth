/**
 * Combine the reducers
 */
// Import dependencies
import { combineReducers } from 'redux';
import userInfo from './userInfo';

const dashApp = combineReducers({
  userInfo,
  serverInfo: (state = {}) => state.serverInfo ? state.serverInfo : {}
});

export default dashApp;
