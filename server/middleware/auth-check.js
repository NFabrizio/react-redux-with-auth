'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * Authorization check middleware
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const user = config.users[0];
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decode) => {
    if (err) { return res.status(400).end(); }

    const userId = decoded.sub;

    return (userId) => {
      if (!userId || userId !== user.id) { return res.status(400).end(); };

      return next();
    };
  });
};
