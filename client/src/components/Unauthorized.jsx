/**
 * Unauthorized access component
 *
 * Renders a message stating the the user is not authorized to access the page
 * with a link back to the login form.
 *
 * @parent /client/src/app.jsx
 *
 * @see Link
 *
 * @export Unauthorized
 *
 * @return - HTML elements
 */
// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router';

const Unauthorized = () => (
  <div className="row">
    <div className="col-md-6 col-md-offset-3">
      <h4>You are not authorized to view this page. You must be logged in.</h4>
      <Link to="/login">Log In &raquo;</Link>
    </div>
  </div>
);

export default Unauthorized;
