'use strict';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import MainLayout from '../client/src/components/MainLayout.jsx';
import Logout from '../client/src/components/Logout.jsx';
import NotFound from '../client/src/components/NotFound.jsx';
import Auth from '../client/src/modules/Auth';
import { Link } from 'react-router';

const children = (
    <p>This is a test.</p>
);
const appTitle = 'React Redux With Auth';
const wrapper = shallow(<MainLayout children={children} />);

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
