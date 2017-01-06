import chai from 'chai';
import userInfo from '../../client/src/reducers/userInfo.js';
import serverInfo from '../../client/src/reducers/serverInfo.js';
import ActionTypes from '../../constants/actionTypes.js';

const expect = chai.expect;

// Set up some test data
const userData = {
  errors: {},
  loggedIn: false,
  successMessage: '',
  user: {
    username: '',
    password: '',
    token: ''
  }
};
const serverData = {
  appPath: '',
  dateTime: '',
  errors: {},
  nodeVersion: '',
  requestSuccess: false
};

describe('reducers', () => {
  it('userInfo should return an empty state', () => {
    expect(userInfo(undefined, {})).to.eql({});
  });
  it('userInfo should handle successful user login', () => {
    userData.loggedIn = true;
    userData.successMessage = 'You have successfully logged in.';
    userData.user.username = 'demo';
    userData.user.password = 'password1';
    userData.user.token = 'abc123';
    expect(userInfo({}, Object.assign({}, userData, {
      type: ActionTypes.LOGIN_USER_SUCCESS
    }))).to.eql(userData);
  });
  it('userInfo should handle failed user login', () => {
    const errors = {
      username: 'Incorrect username.',
      password: 'Incorrect password.',
      summary: 'Incorrect username or password. Please check login form for errors.'
    };
    userData.loggedIn = false;
    userData.successMessage = '';
    userData.user.username = 'test';
    userData.user.password = '1234';
    userData.user.token = '';
    userData.errors = errors;
    expect(userInfo({}, Object.assign({}, userData, {
      type: ActionTypes.LOGIN_USER_FAILURE,
      error: errors
    }))).to.eql(userData);
  });
  it('userInfo should handle successful user logout', () => {
    userData.successMessage = 'You have successfully logged out.';
    userData.user.username = '';
    userData.user.password = '';
    userData.errors = {};
    expect(userInfo({}, Object.assign({}, userData, {
      type: ActionTypes.LOGOUT_USER_SUCCESS
    }))).to.eql(userData);
  });
  it('userInfo should handle failed user logout', () => {
    userData.successMessage = '';
    userData.loggedIn = false;
    const errors = {
      summary: 'Log out process failed.'
    };
    userData.errors = errors;
    expect(userInfo({
      user: {
        username: '',
        password: '',
        token:''
      }
    }, Object.assign({}, userData, {
      type: ActionTypes.LOGOUT_USER_FAILURE,
      error: errors
    }))).to.eql(userData);
  });
  it('userInfo should handle updating username', () => {
    userData.successMessage = '';
    userData.user.username = 'test';
    userData.user.password = '1234';
    userData.user.token = '';
    userData.loggedIn = true;
    userData.errors = {};
    expect(userInfo({
      errors: {},
      loggedIn: true,
      successMessage: '',
      user: {
        password: '1234'
      }
    }, Object.assign({}, userData, {
      type: ActionTypes.UPDATE_USERNAME
    }))).to.eql(userData);
  });
  it('userInfo should handle updating password', () => {
    userData.successMessage = '';
    userData.user.username = 'test';
    userData.user.password = '1234';
    userData.loggedIn = true;
    userData.errors = {};
    expect(userInfo({
      errors: {},
      loggedIn: true,
      successMessage: '',
      user: {
        username: 'test'
      }
    }, Object.assign({}, userData, {
      type: ActionTypes.UPDATE_PASSWORD
    }))).to.eql(userData);
  });
  it('serverInfo should return an empty state', () => {
    expect(serverInfo(undefined, {})).to.eql({});
  });
  it('serverInfo should return empty data set on server reset', () => {
    expect(serverInfo({}, Object.assign({}, serverData, {
      type: ActionTypes.SERVER_INFO_RESET
    }))).to.eql(serverData);
  });
  it('serverInfo should handle a failed server info update', () => {
    const errors = {
      summary: 'The server responded with a status of 404.'
    };
    serverData.errors = errors;
    expect(serverInfo({}, Object.assign({}, serverData, {
      type: ActionTypes.UPDATE_SERVER_FAILURE,
      error: errors
    }))).to.eql(serverData);
  });
  it('serverInfo should handle a successful server info update', () => {
    serverData.appPath = '/Home/testing/server/path',
    serverData.dateTime = '2016-12-31T23:59:59:59Z',
    serverData.nodeVersion = 'v6.7.0',
    serverData.errors = {};
    serverData.requestSuccess = true;
    expect(serverInfo({
      errors: {}
    }, Object.assign({}, serverData, {
      type: ActionTypes.UPDATE_SERVER_SUCCESS
    }))).to.eql(serverData);
  });
});
