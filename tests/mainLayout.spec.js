'use strict';

/**
 * MainLayout presentational component test
 *
 * Tests the MainLayout component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import MainLayout from '../client/src/components/MainLayout.jsx';
import Logout from '../client/src/components/Logout.jsx';
import NotFound from '../client/src/components/NotFound.jsx';
import Auth from '../client/src/modules/Auth';
import { Link } from 'react-router';

// Set up the data to test against
const children = (
    <p>This is a test.</p>
);
const appTitle = 'React Redux With Auth';

/**
 * React component wrapper function
 *
 * Shallow renders the component for testing.
 *
 * @see shallow()
 */
const wrapper = shallow(<MainLayout children={children} />);

/**
 * Create a group of tests for the MainLayout component
 *
 * Run three tests on the MainLayout component. The first test will check that the
 * app title is rendered to the page and that it is linked to the root path. The
 * second test ensures that the Logout component is rendered to the page. The third
 * test checks that the children text is rendered to the page.
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
describe('<MainLayout />', () => {
  it('should display an app title link', () => {
    expect(wrapper.find('.top-bar-left').node.props.children.props.children).to.equal(appTitle);
    expect(wrapper.find('.top-bar-left').node.props.children.props.to).to.equal('/');
  });
  it('should have a <Logout /> element', () => {
    expect(wrapper.find(Logout)).to.have.length(1);
  });
  it('should display children content', () => {
    expect(wrapper.find('.content').node.props.children.props.children).to.equal('This is a test.');
  });
});
