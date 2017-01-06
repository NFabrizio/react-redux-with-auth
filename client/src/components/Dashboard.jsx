/**
 * Dashboard presentational component
 */
// Import necessary dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Dashboard = ({
  nodeVersion,
  appPath,
  dateTime,
  user
}) => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3">
      <h4>Welcome to the Dashboard</h4>
      <p className="node-version">Node.js version: {nodeVersion}</p>
      <p className="path">Path: {appPath}</p>
      <p className="date-time">Date and Time: {dateTime}</p>
      <p className="user">User: {user.username}</p>
    </div>
  </div>
);

Dashboard.PropTypes = {
  nodeVersion: PropTypes.string.isRequired,
  appPath: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Dashboard;
