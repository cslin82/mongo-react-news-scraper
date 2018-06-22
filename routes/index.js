var express = require('express');
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

var mongoose = require("mongoose");

const scrapeURL = "https://www.npr.org/sections/news/";

const moment = require('moment');



const tempObj = require('../tests/docs.json')

// replace this with handlebars helpers
tempObj.forEach(element => {
  element.publishDateDate = moment(element.publishDate).format('LL');
  element.publishDateFull = moment(element.publishDate).format('LLL');
});


/* GET home page. */
router.get('/', function(req, res) {


  var hbsObject = {
    articles: tempObj,
    title: 'Mozilla Blog scraper'
  };
  res.render('index', hbsObject);
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
