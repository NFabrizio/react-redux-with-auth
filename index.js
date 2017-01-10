/**
 * Index.js server set up
 *
 * Sets up the express server and the routes on the server along with the
 * middleware and authentication requirements.
 */

// Import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// Set up Express instance
const app = express();

// Set up the hostname and port config
const hostname = 'localhost';
const port = 3000;

// Tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// Tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the app to use the passport middleware
app.use(passport.initialize());

// Set up the passport strategy
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-login', localLoginStrategy);

// Pass in the authentication check middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Set up routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Create endpoint for server data to display to logged in user
app.get('/serverInfo', (req, res) => {
  res.send({
    node: process.version,
    path: path.dirname(require.main.filename),
    date: new Date()
  });
});

/**
 * Handle every other route with index.html, which will contain a script tag
 * to the application JavaScript files.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'static', 'index.html'));
});

// Allow the client to post data back to the server regarding user actions
app.post('/', function(req, res){
  let parsedData = JSON.parse(req.body.jsonData);
  console.log('\nUser action received:');
  // console.log(req);
  console.log(`Action: ${parsedData.actionType}`);
  console.log('Dispatched data:');
  console.log(parsedData.dispatching);
  console.log('New state:');
  console.log(parsedData.nextState);
  console.log('\n');
  // parsedData = JSON.parse(req.body);
  // console.log(parsedData.actionType);
  // console.log(parsedData.dispatching);
  // console.log(parsedData.nextState);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Message received');
});

// Start the server
app.listen(port, hostname, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running at http://${hostname}:${port}/`);
});
