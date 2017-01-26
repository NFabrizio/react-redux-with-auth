'use strict';

/**
 * NotFound presentational component test
 *
 * Tests the NotFound component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import NotFound from '../client/src/components/NotFound.jsx';
import { Link } from 'react-router';

/**
 * React component wrapper function
 *
 * Shallow renders the component for testing.
 *
 * @see shallow()
 */
const wrapper = shallow(<NotFound />);

/**
 * Create a group of tests for the NotFound component
 *
 * Run two tests on the NotFound component. The first test will check that the
 * 404 message is rendered to the page. The second test ensures that a
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
describe('<NotFound />', () => {
  it('should display a 404 message', () => {
    expect(wrapper.find('h1').node.props.children).to.equal('404');
  });
  it('should display a link back to the main page', () => {
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).node.props.to).to.equal('/');
  });
});
