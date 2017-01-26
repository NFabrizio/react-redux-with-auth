'use strict';

/**
 * jsdom browser set up
 *
 * Sets up a browser using jsdom for use in testing React components, though not
 * a full browser.
 *
 * @link https://github.com/tmpvar/jsdom
 *
 * @parent /package.json
 */

// Import dependencies
require('babel-register')();
const jsdom = require('jsdom').jsdom;

// Set up an array of properties to expose
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const documentRef = document;
