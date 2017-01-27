'use strict';

/**
 * Actions test
 *
 * Tests the Redux actions with chai. This is one of a group of chai tests that
 * can be run with the terminal command run test.
 */

// Import dependencies
import chai from 'chai';
import * as actions from '../../client/src/actions/index.js';
import ActionTypes from '../../constants/actionTypes.js';

const expect = chai.expect;

// Set up some test data
const oldUsername = {
  username: 'testing',
  password: '1234',
  token: 'abc123'
};
const newUsername = {
  username: 'tester',
  password: '5678',
  token: 'abc123'
};
const userError = {
  summary: 'Incorrect username or password. Please check login form for errors.',
  username: 'Incorrect username.',
  password: 'Incorrect password.'
};
const serverData = {
  path: '/home/testing/app',
  date: '2017-01-01T00:00:00:00Z',
  node: 'v6.7.0'
};
const serverError ={
  message: 'An error occurred getting the server info',
  response: {
    data: 'Some test data.',
    status: 404,
    headers: {
      'Content-type': 'application/json'
    }
  }
};

/**
 * Create a group of tests for the actions
 *
 * Tests a successful and failed user login action, a successful and failed user
 * logout action, updating username and password actions as well as a default user
 * action, returning an empty serverInfo state and serverInfo reset action and a
 * successful and failed serverInfo update action. Tests each of these actions
 * by creating an expected result from the action, passing it some test data and
 * comparing the returned result to the expected result.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see to.eql()
 */
describe('actions', () => {
  // Tests the update username action
  it('should create an action to update username', () => {
    const expectedAction = {
      type: ActionTypes.UPDATE_USERNAME,
      user: {
        username: newUsername.username
      }
    };
    expect(actions.updateUser(oldUsername, newUsername)).to.eql(expectedAction);
  });

  // Tests the update password action
  it('should create an action to update password', () => {
    oldUsername.username = 'tester';
    const expectedAction = {
      type: ActionTypes.UPDATE_PASSWORD,
      user: {
        password: newUsername.password
      }
    };
    expect(actions.updateUser(oldUsername, newUsername)).to.eql(expectedAction);
  });

  // Tests the default user action
  it('should create a default user action', () => {
    oldUsername.username = 'tester';
    oldUsername.password = '5678';
    const expectedAction = {
      type: ActionTypes.NO_USER_CHANGE
    };
    expect(actions.updateUser(oldUsername, newUsername)).to.eql(expectedAction);
  });

  // Tests a successful user login
  it('should create a login user success action', () => {
    const expectedAction = {
      type: ActionTypes.LOGIN_USER_SUCCESS,
      loggedIn: true,
      successMessage: 'You have successfully logged in.',
      user: {
        username: newUsername.username,
        password: newUsername.password,
        token: newUsername.token
      }
    };
    expect(actions.loginUserSuccess(newUsername)).to.eql(expectedAction);
  });

  // Tests a failed user login
  it('should create a login user failure action', () => {
    const expectedAction = {
      type: ActionTypes.LOGIN_USER_FAILURE,
      error: userError,
      loggedIn: false,
      user: {
        username: newUsername.username,
        password: newUsername.password
      }
    };
    expect(actions.loginUserFailure(newUsername, userError)).to.eql(expectedAction);
  });

  // Tests a successful user logout action
  it('should create a logout user success action', () => {
    const expectedAction = {
      type: ActionTypes.LOGOUT_USER_SUCCESS,
      loggedIn: false,
      successMessage: 'You have successfully logged out.',
      user: {
        username: '',
        password: ''
      }
    };
    expect(actions.logoutUserSuccess()).to.eql(expectedAction);
  });

  // Tests a failed user logout action
  it('should create a logout user failure action', () => {
    const expectedAction = {
      type: ActionTypes.LOGOUT_USER_FAILURE,
      error: userError,
      loggedIn: true,
      user: {
        username: newUsername.username,
        password: newUsername.password
      }
    };
    expect(actions.logoutUserFailure(newUsername, userError)).to.eql(expectedAction);
  });

  // Tests a successful server info update action
  it('should create an update server success action', () => {
    const expectedAction = {
      type: ActionTypes.UPDATE_SERVER_SUCCESS,
      appPath: serverData.path,
      dateTime: serverData.date,
      nodeVersion: serverData.node,
      requestSuccess: true
    };
    expect(actions.updateServerSuccess(serverData)).to.eql(expectedAction);
  });

  // Tests a failed server info update action
  it('should create an update server failure action', () => {
    const expectedAction = {
      type: ActionTypes.UPDATE_SERVER_FAILURE,
      errors: serverError,
      requestSuccess: false
    };
    expect(actions.updateServerFailure(serverError)).to.eql(expectedAction);
  });

  // Tests a server info reset action
  it('should create a reset server action', () => {
    const expectedAction = {
      type: ActionTypes.SERVER_INFO_RESET
    };
    expect(actions.resetServerInfo()).to.eql(expectedAction);
  });
});
