import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import MainLayout from './MainLayout.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import NotFound from './NotFound.jsx';
import LoginContainer from '../containers/LoginContainer.jsx';
import Unauthorized from './Unauthorized.jsx';
import Auth from '../modules/Auth';

class Routes extends React.Component {
  render() {
    return (
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
  }
};

// export default routes;

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(Routes);
