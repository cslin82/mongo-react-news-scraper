var express = require('express');
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

var mongoose = require("mongoose");

const scrapeURL = ""


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/scrape', function (req, res) {
  // make request from news site, pass stream
  request(scrapeURL, function (error, response, html) {
    if (error) {
      res.status(500).json(error);
    } else {
      // cheerio parse data stream
      var $ = cheerio.load(html);
  
      // store in mongo via mongoose
      
      
      


    } // end no error block
  }) // end request callback
}) // end GET /scrape route



module.exports = router;
