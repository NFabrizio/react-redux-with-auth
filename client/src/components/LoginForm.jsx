import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="login row">
    <div className="login-form col-md-6 col-md-offset-3">
      <h4>Login</h4>
      <p>Welcome to the simple Node React Redux App</p>
      <form className="login-form form-horizontal" id="loginForm" onSubmit={onSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}
        <fieldset>
          <div className="col-md-12 form-group">
            <input
              type="text"
              className="form-control"
              id="dfm-mag-username"
              placeholder="username"
              name="username"
              autoFocus
              required
              onChange={onChange}
            />
          </div>
          <div className=" col-md-12 form-group">
            <input
              type="password"
              className="form-control"
              id="dfm-mag-password"
              placeholder="password"
              name="password"
              required
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            className="btn btn-login"
            id="login-button"
            value="Sign in"
          />
        </fieldset>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
