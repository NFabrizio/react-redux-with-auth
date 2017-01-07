/**
 * Not found component
 *
 * Renders a simple HTML 404 not found page with a link back to the main page.
 *
 * @parent /client/src/app.jsx
 *
 * @see Link
 *
 * @export NotFound
 *
 * @return - HTML elements.
 */

// Import dependencies
import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
  }
};
