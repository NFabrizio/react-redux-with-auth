import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import NotFound from '../client/src/components/NotFound.jsx';
import { Link } from 'react-router';

const wrapper = shallow(<NotFound />);

describe('<NotFound />', () => {
  it('should display a 404 message', () => {
    expect(wrapper.find('h1').node.props.children).to.equal('404');
  });
  it('should display a link back to the main page', () => {
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).node.props.to).to.equal('/');
  });
});
