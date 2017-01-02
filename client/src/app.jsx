import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import routes from './routes.js';
import dashApp from './reducers/index.js';

const initialState = {
  userInfo: {
    loggedIn: false,
    user: {
      username: '',
      password: ''
    },
    errors: {},
    successMessage: ''
  },
  serverInfo: {
    nodeVersion: '',
    appPath: '',
    dateTime: ''
  }
};

export const store = createStore(dashApp, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>), document.getElementById('main'));
