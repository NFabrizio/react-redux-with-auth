'use strict';

/**
 * Unauthorized presentational component test
 *
 * Tests the Unauthorized component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Unauthorized from '../client/src/components/Unauthorized.jsx';
import { Link } from 'react-router';

// Set up the data to test against
const unauthMessage = 'You are not authorized to view this page. You must be logged in.';

/**
 * React component wrapper function
 *
 * Shallow renders the component for testing.
 *
 * @see shallow()
 */
const wrapper = shallow(<Unauthorized />);

/**
 * Create a group of tests for the Unauthorized component
 *
 * Run two tests on the Unauthorized component. The first test will check that the
 * unauthorized message is rendered to the page. The second test ensures that a
 * link to the login page is rendered and links to the login path.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see find()
 * @see to.equal()
 * @see to.have.length()
 *
 * @param {Object} $wrapper - Rendered React element.
 */
describe('<Unauthorized />', () => {
  it('should display an unauthorized message', () => {
    expect(wrapper.find('h4').node.props.children).to.equal(unauthMessage);
  });
  it('should display a link to the login page', () => {
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).node.props.to).to.equal('/login');
  });
});
