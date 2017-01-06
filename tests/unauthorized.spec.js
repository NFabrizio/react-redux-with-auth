import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Unauthorized from '../client/src/components/Unauthorized.jsx';
import { Link } from 'react-router';

const unauthMessage = 'You are not authorized to view this page. You must be logged in.';
const wrapper = shallow(<Unauthorized />);

describe('<Unauthorized />', () => {
  it('should display an unauthorized message', () => {
    expect(wrapper.find('h4').node.props.children).to.equal(unauthMessage);
  });
  it('should display a link to the login page', () => {
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).node.props.to).to.equal('/login');
  });
});
