const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set up the hostname and port config
const hostname = 'localhost';
const port = 3000;

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// Create endpoint for server data to display to logged in user
app.get('/serverInfo', (req, res) => {
  res.send({
    node: process.version,
    path: path.dirname(require.main.filename),
    date: new Date()
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'static', 'index.html'));
});

// start the server
app.listen(port, hostname, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running at http://${hostname}:${port}/`);
});
