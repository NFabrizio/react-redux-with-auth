import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Dashboard from '../client/src/components/Dashboard.jsx';

const serverData = {
  nodeVersion: '',
  appPath: '',
  dateTime: '',
  user: {
    username: '',
    password: ''
  }
};
const labels = {
  nodeVersion: 'Node.js version: ',
  appPath: 'Path: ',
  dateTime: 'Date and Time: ',
  user: 'User: '
};
let wrapper = shallow(<Dashboard
  nodeVersion={serverData.nodeVersion}
  appPath={serverData.appPath}
  dateTime={serverData.dateTime}
  user={serverData.user}
  />);

describe('<Dashboard />', () => {
  it('should display Node.js version, path, date and time and user', () => {
    expect(wrapper.find('p')).to.have.length(4);
    expect(wrapper.find('p.node-version').node.props.children[0]).to.equal(labels.nodeVersion);
    expect(wrapper.find('p.path').node.props.children[0]).to.equal(labels.appPath);
    expect(wrapper.find('p.date-time').node.props.children[0]).to.equal(labels.dateTime);
    expect(wrapper.find('p.user').node.props.children[0]).to.equal(labels.user);
  });
  it('should have props for nodeVersion, appPath, dateTime and user', () => {
    expect(wrapper.props().nodeVersion).to.be.defined;
    expect(wrapper.props().appPath).to.be.defined;
    expect(wrapper.props().dateTime).to.be.defined;
    expect(wrapper.props().user).to.be.defined;
  });
});
