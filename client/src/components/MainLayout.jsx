import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';


const MainLayout = ({ children }) => (
  <div className="container">
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React Redux With Auth</IndexLink>
      </div>
      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
      </div>
    </div>
    <div className="content">{children}</div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default MainLayout;
