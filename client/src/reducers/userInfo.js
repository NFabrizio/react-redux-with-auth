/**
 * UserInfo reducers
 */
// Import dependencies
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
} from '../actions';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        errors: {},
        loggedIn: action.loggedIn,
        successMessage: action.successMessage,
        user: {
          username: action.user.username,
          password: action.user.password
        }
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.error,
        loggedIn: action.loggedIn,
        successMessage: '',
        user: {
          username: action.user.username,
          password: action.user.password
        }
      });
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        errors: {},
        loggedIn: action.loggedIn,
        successMessage: action.successMessage,
          user: {
            username: '',
            password: ''
          }
      });
    case LOGOUT_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.error,
        loggedIn: action.loggedIn,
        successMessage: ''
      });
    case UPDATE_USERNAME:
      return Object.assign({}, state, {
        user: {
          username: action.user.username,
          password: state.user.password
        }
      });
    case UPDATE_PASSWORD:
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          password: action.user.password
        }
      });
    default:
      return state;
  }
};

export default userInfo;
