import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';
import LoginPage from './containers/LoginPage.jsx';

const routes = (
  <Route path="/" component={ MainLayout }>
    <IndexRedirect to="dashboard" />
    <Route
      path="dashboard"
      component={ Dashboard }
    />
    <Route
      path="login"
      component={ LoginPage }
    />
    <Route
      path="*"
      component={ NotFound }
    />
  </Route>
);

export default routes;
