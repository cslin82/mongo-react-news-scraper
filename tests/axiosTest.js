const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');

const scrapeURL = 'https://blog.mozilla.org/';
const Article = require('../models/articleModel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines2';

// Connect to the Mongo DB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to ' + MONGODB_URI);
    // First, tell the console what server.js is doing
    console.log(`Scraping ${scrapeURL}`);

    axios(scrapeURL)
      .then(response => {
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        let articles = $('article.post');

        let otherArticles = articles.map((i, element) => {
          console.log('i:', i);
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

          return {
            title,
            url,
            author,
            publishDate,
            summary,
            saved: false
          };
        });
        // console.log(Object.keys(otherArticles));
        // console.log('***');

        // console.log(otherArticles.toArray());
        // console.log('***');
        return Object.values(otherArticles.toArray());
      }) // end then
      .then(articleArr => {
        // console.log(articleArr);

        // return Article.insertMany(articleArr)
        return Article.updateMany(articleArr);
      }) // end then
      .then(thingy => console.log(thingy));
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err.message);
  });
