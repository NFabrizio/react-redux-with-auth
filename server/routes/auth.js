const express = require('express');

const router = new express.Router();

/**
 * Validate the login form
 *
 * @param {object} input - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function checkCredentials(input) {
console.log(input);
  const errors = {};
  let isInputValid = true;
  let message = '';

  if (!input || !input.username || input.username.trim() !== 'demo') {
    isInputValid = false;
    errors.username = 'Incorrect username.';
  }

  if (!input || !input.password || input.password.trim() !== 'password1') {
    isInputValid = false;
    errors.password = 'Incorrect password.';
  }

  if (!isInputValid) {
    message = 'Check login form for the following errors:';
  }

  return {
    success: isInputValid,
    message,
    errors
  };
}

router.post('/login', (req, res) => {
console.log(res);
  const checkResult = checkCredentials(req.body);
  if (!checkResult.success) {
    return res.status(400).json({
      success: false,
      message: checkResult.message,
      errors: checkResult.errors
    });
  }
  return res.status(200).end();
});

module.exports = router;
