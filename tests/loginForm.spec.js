'use strict';

/**
 * LoginForm presentational component test
 *
 * Tests the LoginForm component using chai with enzyme. This is one of
 * a group of React component tests that can be run with the terminal command
 * run test-react.
 */

// Import dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import LoginForm from '../client/src/components/LoginForm.jsx';

// Sets up the login data and initial state
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

/**
 * React component wrapper function
 *
 * Shallow renders the component for testing.
 *
 * @see shallow()
 */
let wrapper = shallow(<LoginForm
    onSubmit={loginData.onSubmit}
    onChange={loginData.onChange}
    errors={loginData.errors}
    successMessage={loginData.successMessage}
    user={loginData.user}
  />);

/**
 * Create a group of tests for the LoginForm component
 *
 * Run six tests on the LoginForm component. The first test will check that there
 * is a username field rendered in the form. The second test will check that there
 * is a password field rendered in the form. The third test will check that there
 * is a login button rendered in the form. The fourth test passes the successMessage
 * to the LoginForm component and checks that the message text is rendered on the
 * page. The fifth test passes the errors to the LoginForm component and checks
 * that the error message text is rendered on the page. The sixth test ensures
 * that the LoginForm component is passed the required props.
 *
 * @see describe()
 * @see it()
 * @see expect()
 * @see find()
 * @see to.equal()
 * @see to.have.length()
 * @see to.be.defined
 *
 * @param {Object} $wrapper - Rendered React element.
 */
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
        onSubmit={loginData.onSubmit}
        onChange={loginData.onChange}
        errors={loginData.errors}
        successMessage={successMessage}
        user={loginData.user}
      />);
    expect(wrapper.find('.success-message').node.props.children).to.equal(successMessage);
  });
  it('should display an error message', () => {
    wrapper = shallow(<LoginForm
        onSubmit={loginData.onSubmit}
        onChange={loginData.onChange}
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
