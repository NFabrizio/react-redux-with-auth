const express = require('express');
const passport = require('passport');
const config = require('../../config');

const router = new express.Router();
const user = config.users[0];

/**
 * Validate the login form
 *
 * @param {object} input - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function checkCredentials(input) {
  const errors = {};
  let isInputValid = true;
  let message = '';

  if (!input || !input.username || input.username.trim() !== user.username) {
    isInputValid = false;
    errors.username = 'Incorrect username.';
  }

  if (!input || !input.password || input.password.trim() !== user.password) {
    isInputValid = false;
    errors.password = 'Incorrect password.';
  }

  if (!isInputValid) {
    message = 'Incorrect username or password. Please check login form for errors.';
  }

  return {
    success: isInputValid,
    message,
    errors
  };
}

router.post('/login', (req, res, next) => {
// console.log(req);
  const checkResult = checkCredentials(req.body);
  if (!checkResult.success) {
    return res.status(400).json({
      success: false,
      message: checkResult.message,
      errors: checkResult.errors
    });
  }
  // return res.status(200).end();
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the login form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in.',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
