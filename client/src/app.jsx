import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from './middleware/Logger.js';
import routes from './routes.js';
import dashApp from './reducers/index.js';

const initialState = {
  userInfo: {
    errors: {},
    loggedIn: false,
    successMessage: '',
    user: {
      username: '',
      password: ''
    }
  },
  serverInfo: {
    appPath: '',
    dateTime: '',
    errors: {},
    nodeVersion: '',
    requestSuccess: false
  }
};

export const store = createStore(dashApp, initialState, compose(applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>), document.getElementById('main'));
