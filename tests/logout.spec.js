'use strict';

/**
 * Logout container test
 *
 * Tests the Logout component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Logout from '../client/src/components/Logout.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';
import config from '../config';

// Sets up the user data and initial state for a logged in user
const user = config.users[0];
const InitialStateLoggedIn = Object.assign({}, InitialState, {
  userInfo:
    { errors: {},
     loggedIn: false,
     successMessage: '',
       user: {
        username: user.username,
        password: user.password,
        token: 'abc123'
      }
    }
});
const store = storeDummy(InitialState);
const storeLoggedIn = storeDummy(InitialStateLoggedIn);

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
    <Logout />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);

/**
 * React component wrapper function
 *
 * Mounts the component and wraps it with the Provider component to allow use of the
 * Redux state. Also, passes a context and child context to the mounted component.
 * Uses the logged in state for Redux.
 *
 * @see mount()
 */
const wrapperLoggedIn = mount(
  <Provider store={storeLoggedIn}>
    <Logout />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);

/**
 * Create a group of tests for the Logout component
 *
 * Run two tests on the Logout component. The first test will check that no logout
 * link is rendered to the page if the user is not logged in. The second test checks
 * that there is a logout link rendered to the page if the user is logged in.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see find()
 * @see to.have.length()
 *
 * @param {Object} $wrapper - Mounted React element with logged out state.
 * @param {Object} $wrapperLoggedIn - Mounted React element with logged in state.
 */
describe('<Logout />', () => {
  it('should not display link if user is not logged in', () => {
    expect(wrapper.find(Logout)).to.have.length(1);
    expect(wrapper.find(Logout).render().find('a')).to.have.length(0);
    // expect(wrapper.find(Logout).text()).to.equal('Log out');
  });
  it('should display a log out link if user is logged in', () => {
    expect(wrapperLoggedIn.find(Logout)).to.have.length(1);
    expect(wrapperLoggedIn.find(Logout).render().find('a')).to.have.length(1);
    // expect(wrapperLoggedIn.find(Logout).text()).to.equal('Log out');
  });
});
