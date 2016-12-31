import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import Auth from './modules/Auth';

const routes = (
  <Route path="/" component={ MainLayout }>
    <IndexRedirect to="dashboard" />
    <Route
      path="dashboard"
      getComponent={ (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Dashboard);
        } else {
          callback(null, LoginContainer);
        }
      } }
    />
    <Route
      path="login"
      component={ LoginContainer }
    />
    <Route
      path="logout"
      onEnter={ (nextState, replace) => {
        Auth.deauthenticateUser();

        replace('/');
      }}
    />
    <Route
      path="*"
      component={ NotFound }
    />
  </Route>
);

export default routes;
