/**
 * Dashboard presentational component
 *
 * Renders the login form and error and success messages if they exist. Handles
 * the onsubmit event for the form and the onchange event for the username and
 * password fields.
 *
 * @parent /client/src/components/LoginContainer.jsx
 *
 * @export LoginForm
 */

// Import dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Dashboard function
 *
 * Returns an HTML dashboard with information about the server.
 *
 * @param {String} $nodeVersion - Version of Node running on the server.
 * @param {String} $appPath - Server path to the application.
 * @param {String} $dateTime - Date and time the request was made.
 * @param {String} $user - Username of the currently logged in user.
 *
 * @return - HTML elements.
 */
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

/**
 * Defines and validates the props for the component
 *
 * Ensures the type for each prop and that the prop exists if it is required.
 *
 * @see PropTypes
 *
 * @return null
 */
Dashboard.PropTypes = {
  nodeVersion: PropTypes.string.isRequired,
  appPath: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

// Set the default export for the module
export default Dashboard;
