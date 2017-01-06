import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Logout from '../client/src/components/Logout.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';

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
const store = storeDummy({});
const wrapper = mount(
  <Provider store={store}>
    <Logout />
  </Provider>
);

describe('<Logout />', () => {
  it('should display a log out link', () => {
    expect(wrapper.find(Logout)).to.have.length(1);
    expect(wrapper.find(Logout).render().find('a')).to.have.length(1);
    expect(wrapper.find(Logout).text()).to.equal('Log out');
  });
});
