'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Passport local strategy
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim()
  };
  const user = config.users[0];

  if (!userData) {
    const error = new Error('Incorrect email or password');
    error.name = 'IncorrectCredentialsError';
    error.message = 'No user data supplied'
    return done(error);
  }

  if (userData.password !== user.password) {
    const error = new Error('Incorrect email or password');
    error.name = 'IncorrectCredentialsError';
    error.message = 'Incorrect email or password';
    return done(error);
  }

  const payload = {
    sub: user.id
  };

  const token = jwt.sign(payload, config.jwtSecret);
  const data = {
    name: user.username
  };

  return done(null, token, data);
});
