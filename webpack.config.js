/**
 * Webpack configuration
 *
 * Configures Webpack to the custom settings for this application.
 *
 * @export {Object} - Configuration settings object.
 */

// Import dependencies
const path = require('path');

module.exports = {
  // Entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // Bundle file name and location for the resulting bundle
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {
    // Apply loaders to files that meet the following conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      }
    }],
  },

  // Start Webpack in a watch mode, so it will rebuild the bundle on changes
  watch: true
};
