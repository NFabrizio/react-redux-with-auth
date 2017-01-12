'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DashboardContainer from '../client/src/containers/DashboardContainer.jsx';
import Dashboard from '../client/src/components/Dashboard.jsx';
import { Link } from 'react-router';
import { storeDummy } from './storeDummy.js';
import InitialState from '../constants/InitialState.js';

const store = storeDummy(InitialState);
const wrapper = mount(
  <Provider store={store}>
    <DashboardContainer />
  </Provider>
);

describe('<DashboardContainer />', () => {
  it('should have a <DashboardContainer /> element', () => {
    expect(wrapper.find(DashboardContainer)).to.have.length(1);
  });
  it('should have a <Dashboard /> element', () => {
    expect(wrapper.find(Dashboard)).to.have.length(1);
  });
});
