const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');

var PORT = process.env.PORT || 8080;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
// TODO: Make server listen wait for mongoose connection and see what conventional structure is
mongoose.connect(MONGODB_URI)
  .then(
    () => {
      console.log('connected to ' + MONGODB_URI);
    },
    err => { throw err }
  );

// Initialize Express
var app = express();

// Configure middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
// Seriously, don't forget all the kinds to be used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Routes
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Routes
// TODO: investigate clever ways to shorten this
var apiRouter = require('./routes/api-routes');
app.use('/', apiRouter);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "; go to http://localhost:" + PORT + "/");
});
