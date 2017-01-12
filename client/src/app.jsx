import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from './middleware/Logger.js';
//import Routes from './components/Routes.jsx';
import dashApp from './reducers/index.js';
import InitialState from '../../constants/InitialState.js';
import MainLayout from './components/MainLayout.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import NotFound from './components/NotFound.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Auth from './modules/Auth';

export const store = createStore(dashApp, InitialState, applyMiddleware(logger));

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ MainLayout }>
        <IndexRedirect to="login" />
        <Route
          path="dashboard"
          getComponent={ (location, callback) => {
            if (store.getState().userInfo.user.token && store.getState().userInfo.user.token !== '') {
              callback(null, DashboardContainer);
            } else {
              callback(null, Unauthorized);
            }
          } }
        />
        <Route
          path="login"
          component={ LoginContainer }
        />
        <Route
          path="*"
          component={ NotFound }
        />
      </Route>
    </Router>
  </Provider>), document.getElementById('main'));
