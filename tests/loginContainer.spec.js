'use strict';

/**
 * Login container test
 *
 * Tests the LoginContainer component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import LoginContainer from '../client/src/containers/LoginContainer.jsx';
import LoginForm from '../client/src/components/LoginForm.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';

// Set up dummy store
const store = storeDummy(InitialState);

/**
 * React component wrapper function
 *
 * Mounts the component and wraps it with the Provider component to allow use of the
 * Redux state. Also, passes a context and child context to the mounted component.
 *
 * @see mount()
 */
const wrapper = mount(
  <Provider store={store}>
    <LoginContainer />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);

/**
 * Create a group of tests for the LoginContainer component
 *
 * Run two tests on the LoginContainer component. The first test will check to
 * make sure there is a LoginContainer element rendered to the page. The second
 * will ensure that a LoginForm presentational component will be rendered to the
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
describe('<LoginContainer />', () => {
  it('should have a <LoginContainer /> element', () => {
    expect(wrapper.find(LoginContainer)).to.have.length(1);
  });
  it('should have a <LoginForm /> element', () => {
    expect(wrapper.find(LoginForm)).to.have.length(1);
  });
});
