'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import LoginContainer from '../client/src/containers/LoginContainer.jsx';
import LoginForm from '../client/src/components/LoginForm.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';

const store = storeDummy(InitialState);
const wrapper = mount(
  <Provider store={store}>
    <LoginContainer />
  </Provider>,
  {
    context: { router: {} },
    childContextTypes: { router: React.PropTypes.object }
  }
);

describe('<LoginContainer />', () => {
  it('should have a <LoginContainer /> element', () => {
    expect(wrapper.find(LoginContainer)).to.have.length(1);
  });
  it('should have a <LoginForm /> element', () => {
    expect(wrapper.find(LoginForm)).to.have.length(1);
  });
});
