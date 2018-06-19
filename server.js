const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const express = require('express');
const exphbs  = require('express-handlebars');

// var cheerio = require("cheerio");
// var request = require("request");

var PORT = 8080;

// Initialize Express
var app = express();

// Configure middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsdb");

// Routes

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "; go to http://localhost:" + PORT + "/");
});
