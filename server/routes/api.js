'use strict';

const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'You are authorized to see this message.'
  });
});

module.exports = router;
