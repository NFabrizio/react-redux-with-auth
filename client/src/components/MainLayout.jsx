import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const MainLayout = ({ children }) => (
  <div className="container">
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React Redux With Auth</IndexLink>
      </div>
      { Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Log out</Link>
        </div>
        ) : ''
      }
    </div>
    <div className="content">{children}</div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default MainLayout;
