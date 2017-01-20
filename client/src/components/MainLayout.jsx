/**
 * MainLayout component
 *
 * Sets up the wrapper inside of which to render all of the other components so
 * that the look and feel of the application stays consistent. Renders a container
 * with a top bar containing the application name linked to the root directory and
 * also the Logout component. Renders children components below the top bar.
 *
 * @parent /client/src/app.jsx
 *
 * @export MainLayout
 */

// Import dependencies
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Logout from './Logout.jsx';

/**
 * MainLayout function
 *
 * Renders the MainLayout component.
 *
 * @param {Object} $children - Child components passed in as props from the parent.
 *
 * @return - HTML elements.
 */
const MainLayout = ({ children }) => (
  <div className="container">
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React Redux With Auth</IndexLink>
      </div>
        <div className="top-bar-right">
          <Logout />
        </div>
    </div>
    <div className="content">{children}</div>
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
MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

// Set the default export for the module
export default MainLayout;
