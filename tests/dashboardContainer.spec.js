'use strict';

/**
 * Dashboard container test
 *
 * Tests the DashboardContainer component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DashboardContainer from '../client/src/containers/DashboardContainer.jsx';
import Dashboard from '../client/src/components/Dashboard.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';

// Set up dummy store
const store = storeDummy(InitialState);

/**
 * React component wrapper function
 *
 * Mounts the component and wraps it with the Provider component to allow use of the
 * Redux state.
 *
 * @see mount()
 */
const wrapper = mount(
  <Provider store={store}>
    <DashboardContainer />
  </Provider>
);

/**
 * Create a group of tests for the DashboardContainer component
 *
 * Run two tests on the DahboardContainer component. The first test will check to
 * make sure there is a DashboardContainer element rendered to the page. The second
 * will ensure that a Dashboard presentational component will be rendered to the
 * page also.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see find()
 * @see to.have.length()
 *
 * @param {Object} $wrapper - Mounted React element.
 */
describe('<DashboardContainer />', () => {
  it('should have a <DashboardContainer /> element', () => {
    expect(wrapper.find(DashboardContainer)).to.have.length(1);
  });
  it('should have a <Dashboard /> element', () => {
    expect(wrapper.find(Dashboard)).to.have.length(1);
  });
});
