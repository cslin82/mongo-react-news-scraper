const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
const axios = require('axios');

const validator = require('validator');

const Article = require('../../models/articleModel');
const Note = require('../../models/noteModel');

const scrapeURL = 'https://blog.mozilla.org/';

// TODO make this RESTful with put on articles
router.get('/togglestory/:storyID', function(req, res) {
  console.log(req.params.storyID);
  if (!validator.isHexadecimal(req.params.storyID)) {
    res.status(500).send('Invalid storyID');
  } else {
    Article.findById(req.params.storyID, function(err, article) {
      if (err) res.status(500).json(err);
      article.set({ saved: !article.saved });
      article.save(function(err, updatedarticle) {
        if (err) res.status(500).json(err);
        res.json(updatedarticle);
      });
    });
  }
}); // end GET

router.get('/scrape/:pageNumber', function(req, res) {
  console.log('req.params.pageNumber:', req.params.pageNumber, '(' + typeof req.params.pageNumber + ')');

  let scrapeURLPage = scrapeURL + 'page/' + req.params.pageNumber + '/';

  axios
    .get(scrapeURLPage)
    .then(function(response) {
      console.log('pulling articles from ', scrapeURLPage);

      // cheerio parse data stream
      const $ = cheerio.load(response.data);
      console.log(response.data);

      let newArticles = [];

      // store in mongo via mongoose
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

        let newArticle = new Article(newArticleObj).save(function(err) {
          if (err) console.error(err);
          console.log('saved');
        });
        newArticles.push(newArticleObj);
      });
      res.json(newArticles);
      // TODO: figure out what to actually send back on scrape
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
}); // end GET /scrape route

router.post('/article/:articleId', function(req, res) {
  let newNote = { ...req.body };
  console.log(newNote);

  Note.create(newNote)
    .then(function(mNote) {
      console.log('mNote:');

      console.log(JSON.stringify(mNote, '', 2));
      return Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: { notes: mNote._id } }, { new: true });
    })
    .then(function(dbArticle) {
      console.log(JSON.stringify(dbArticle, '', 2));
      res.json(dbArticle);
    });
}); // end POST new note route

router.post('/deletenote', function(req, res) {
  // TODO: pull from Article.notes

  Note.deleteOne({ _id: req.body.noteId }).then(function(result) {
    res.json(result);
  });
});

router.route('/articles').get(function(req, res) {
  Article.find()
    .sort('-publishDate')
    .exec(function(err, articles) {
      res.json(articles);
    });
});

module.exports = router;
