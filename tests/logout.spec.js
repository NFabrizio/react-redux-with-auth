'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Logout from '../client/src/components/Logout.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';
import config from '../config';

// const logoutData = {
//   onSubmit: () => { return; },
//   onChange: () => { return; },
//   errors: {
//     summary: '',
//     username: '',
//     password: ''
//   },
//   successMessage: '',
//   user: {
//     username: '',
//     password: ''
//   }
// };
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

const wrapper = mount(
  <Provider store={store}>
    <Logout />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);
const wrapperLoggedIn = mount(
  <Provider store={storeLoggedIn}>
    <Logout />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);

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
