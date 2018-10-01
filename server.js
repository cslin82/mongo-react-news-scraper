const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlinesreact';

// Initialize Express
const app = express();

// Use morgan logger for logging requests
if (process.env.NODE_ENV === 'production') {
  app.use(logger('common'));
} else {
  app.use(logger('dev'));
}

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Routes
// TODO: investigate clever ways to shorten this
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// TODO: Make server listen wait for mongoose connection and see what conventional structure is
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to ' + MONGODB_URI);
    // Start the server
    app.listen(PORT, function() {
      console.log('API server running on port ' + PORT + '; go to http://localhost:' + PORT + '/');
    });
  })
  .catch(err => {
    console.error(err.message);
  });
