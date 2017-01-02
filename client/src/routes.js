import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import MainLayout from './components/MainLayout.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import NotFound from './components/NotFound.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Auth from './modules/Auth';

const routes = (
  <Route path="/" component={ MainLayout }>
    <IndexRedirect to="dashboard" />
    <Route
      path="dashboard"
      getComponent={ (location, callback) => {
        if (Auth.isUserAuthenticated()) {
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
);

export default routes;
