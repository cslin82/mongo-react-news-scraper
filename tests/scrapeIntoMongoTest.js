const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request');

const scrapeURL = 'https://blog.mozilla.org/';

const Article = require('../models/articleModel');
// const Note = require('../models/noteModel')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose
  .connect(MONGODB_URI)
  .then(
    () => {
      console.log('connected to ' + MONGODB_URI);
    },
    err => {
      throw err;
    }
  )
  .then(() => {
    request(scrapeURL, function(error, response, html) {
      console.log('pulling articles from ', scrapeURL);

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $('article.post').each(function(i, element) {
        let title = $('h2.entry-title', element)
          .text()
          .trim();
        let url = $('a.go', element)
          .attr('href')
          .trim();
        let author = $('address.vcard', element)
          .text()
          .trim();
        let summary = $('div.entry-summary', element)
          .text()
          .trim();

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
        };

        // console.log('newArticleObj:', newArticleObj);

        let newArticle = new Article(newArticleObj).save(function(err) {
          if (err) throw err;
          console.log('saved');
        });
      });
    });
  });
// ** this part should end process but is in the wrong place **
// .finally(
//     () => mongoose.connection.close()
// )
