var express = require('express');
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

// var mongoose = require("mongoose");

const scrapeURL = "https://blog.mozilla.org/";

const moment = require('moment');

const Article = require('../models/articleModel')


// const tempObj = require('../tests/docs.json')

// replace this with handlebars helpers
// tempObj.forEach(element => {
//   element.publishDateDate = moment(element.publishDate).format('LL');
//   element.publishDateFull = moment(element.publishDate).format('LLL');
// });


/* GET home page. */
router.get('/', function(req, res) {
  Article.find({}, function (err, docs) {
    if (err) throw err;

    docs.forEach(element => {
      element.publishDateDate = moment(element.publishDate).format('LL');
      element.publishDateFull = moment(element.publishDate).format('LLL');
    });
    console.log(JSON.stringify(docs, '', 2));

  var hbsObject = {
    articles: docs,
    title: 'Mozilla Blog scraper'
  };
  res.render('index', hbsObject);
})


});

router.get('/scrape', function (req, res) {
  // make request from news site, pass stream
  request(scrapeURL, function (error, response, html) {
    if (error) {
      res.status(500).json(error);
    } else {
      console.log('pulling articles from ', scrapeURL);

      // cheerio parse data stream
      var $ = cheerio.load(html);
  
      // store in mongo via mongoose
      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("article.post").each(function (i, element) {
        let title = $('h2.entry-title', element).text().trim();
        let url = $('a.go', element).attr("href").trim();
        let author = $('address.vcard', element).text().trim();
        let summary = $('div.entry-summary', element).text().trim();

        summary = summary.slice(0, summary.indexOf('Read more') - 1).trim();
        // console.log('summary:', summary);

        let publishDate = new Date($('time.published', element).attr('datetime'));

        let newArticleObj = {
          title,
          url,
          author,
          publishDate,
          summary,
          saved: false
        }

        // console.log('newArticleObj:', newArticleObj);

        let newArticle = new Article(newArticleObj)
          .save(function (err) {
            if (err) console.error(err);
            console.log('saved');
          });
      });




      res.redirect('/');
    } // end no error block
  }) // end request callback
}) // end GET /scrape route



module.exports = router;
