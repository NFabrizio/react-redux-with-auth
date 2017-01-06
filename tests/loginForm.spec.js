import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import LoginForm from '../client/src/components/LoginForm.jsx';

const loginData = {
  onSubmit: () => { return; },
  onChange: () => { return; },
  errors: {
    summary: '',
    username: '',
    password: ''
  },
  successMessage: '',
  user: {
    username: '',
    password: ''
  }
};
const successMessage = 'You have successfully logged in.';
const errors = {
  summary: 'Incorrect username or password. Please check login form for errors.',
  username: 'Incorrect username.',
  password: 'Incorrect password.'
};
let wrapper = shallow(<LoginForm
    onSubmit={loginData.onSubmit}
    onChange={loginData.onChange}
    errors={loginData.errors}
    successMessage={loginData.successMessage}
    user={loginData.user}
  />);

describe('<LoginForm />', () => {
  it('should display a username field', () => {
    expect(wrapper.find('input#username')).to.have.length(1);
  });
  it('should display a password field', () => {
    expect(wrapper.find('input#password')).to.have.length(1);
  });
  it('should display a button to log in', () => {
    expect(wrapper.find('input#login-button')).to.have.length(1);
  });
  it('should display a success message', () => {
    wrapper = shallow(<LoginForm
        onSubmit={loginData.loginSubmit}
        onChange={loginData.changeUserData}
        errors={loginData.errors}
        successMessage={successMessage}
        user={loginData.user}
      />);
    expect(wrapper.find('.success-message').node.props.children).to.equal(successMessage);
  });
  it('should display an error message', () => {
    wrapper = shallow(<LoginForm
        onSubmit={loginData.loginSubmit}
        onChange={loginData.changeUserData}
        errors={errors}
        successMessage={loginData.successMessage}
        user={loginData.user}
      />);
    expect(wrapper.find('.error-message').node.props.children).to.equal(errors.summary);
  });
  it('should have props for onSubmit, onChange, errors, successMessage and user', () => {
    expect(wrapper.props().onSubmit).to.be.defined;
    expect(wrapper.props().onChange).to.be.defined;
    expect(wrapper.props().errors).to.be.defined;
    expect(wrapper.props().successMessage).to.be.defined;
    expect(wrapper.props().user).to.be.defined;
  });
});
