'use strict';

/**
 * Dashboard presentational component test
 *
 * Tests the Dashboard component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Dashboard from '../client/src/components/Dashboard.jsx';

// Sets up the server data and initial state
const serverData = {
  nodeVersion: '',
  appPath: '',
  dateTime: '',
  user: {
    username: '',
    password: ''
  }
};
const labels = {
  nodeVersion: 'Node.js version: ',
  appPath: 'Path: ',
  dateTime: 'Date and Time: ',
  user: 'User: '
};

/**
 * React component wrapper function
 *
 * Shallow renders the component for testing.
 *
 * @see shallow()
 */
let wrapper = shallow(<Dashboard
  nodeVersion={serverData.nodeVersion}
  appPath={serverData.appPath}
  dateTime={serverData.dateTime}
  user={serverData.user}
  />);

/**
 * Create a group of tests for the Dashboard component
 *
 * Run two tests on the Dashboard component. The first test will check that the
 * server information is rendered to the page. The second test ensures that the
 * Dashboard component is passed the required props.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see find()
 * @see to.equal()
 * @see to.have.length()
 * @see to.be.defined
 *
 * @param {Object} $wrapper - Rendered React element.
 */
describe('<Dashboard />', () => {
  it('should display Node.js version, path, date and time and user', () => {
    expect(wrapper.find('p')).to.have.length(4);
    expect(wrapper.find('p.node-version').node.props.children[0]).to.equal(labels.nodeVersion);
    expect(wrapper.find('p.path').node.props.children[0]).to.equal(labels.appPath);
    expect(wrapper.find('p.date-time').node.props.children[0]).to.equal(labels.dateTime);
    expect(wrapper.find('p.user').node.props.children[0]).to.equal(labels.user);
  });
  it('should have props for nodeVersion, appPath, dateTime and user', () => {
    expect(wrapper.props().nodeVersion).to.be.defined;
    expect(wrapper.props().appPath).to.be.defined;
    expect(wrapper.props().dateTime).to.be.defined;
    expect(wrapper.props().user).to.be.defined;
  });
});
