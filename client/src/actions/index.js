/**
 * Actions for Redux
 */
// Set up constants for types
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_SERVER_SUCCESS = 'UPDATE_SERVER_SUCCESS';
export const UPDATE_SERVER_FAILURE = 'UPDATE_SERVER_FAILURE';
export const SERVER_INFO_RESET = 'SERVER_INFO_RESET';

export const updateUser = (currentUser, newUser) => {
  if (currentUser.username !== newUser.username) {
    return {
      type: UPDATE_USERNAME,
      user: {
        username: newUser.username
      }
    };
  }
  if (currentUser.password !== newUser.password) {
    return {
      type: UPDATE_PASSWORD,
      user: {
        password: newUser.password
      }
    };
  }
  return {
    type: 'NO_USER_CHANGE'
  };
}

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    loggedIn: true,
    successMessage: 'You have successfully logged in.',
    user: {
      username: user.username,
      password: user.password
    }
  };
};

export const loginUserFailure = (user, error) => {
  return {
    type: LOGIN_USER_FAILURE,
    error,
    loggedIn: false,
    user: {
      username: user.username,
      password: user.password
    }
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    loggedIn: false,
    successMessage: 'You have successfully logged out.',
    user: {
      username: '',
      password: ''
    }
  };
};

export const logoutUserFailure = (user, error) => {
  return {
    type: LOGOUT_USER_FAILURE,
    error,
    loggedIn: true,
    user: {
      username: user.username,
      password: user.password
    }
  };
};

export const updateServerSuccess = (result) => {
  return {
    type: UPDATE_SERVER_SUCCESS,
    appPath: result.path,
    dateTime: result.date,
    nodeVersion: result.node,
    requestSuccess: true
  };
};

export const updateServerFailure = (error) => {
  return {
    type: UPDATE_SERVER_FAILURE,
    errors: error,
    requestSuccess: false
  };
};

export const resetServerInfo = () => {
  return {
    type: SERVER_INFO_RESET
  };
};
