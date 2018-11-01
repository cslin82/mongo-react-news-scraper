const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
const axios = require('axios');

const validator = require('validator');

const Article = require('../../models/articleModel');
const Note = require('../../models/noteModel');

const scrapeURL = 'https://blog.mozilla.org/';

router
  .route('/articles/:articleId')
  .put(function(req, res) {
    if (!validator.isMongoId(req.params.articleId)) {
      res.status(500).send('Invalid articleId');
    } else {
      Article.findById(req.params.articleId, function(err, article) {
        if (err) res.status(500).json(err);
        // TODO make this accept the saved status from req.body
        article.set({ saved: !article.saved });
        article.save(function(err, updatedarticle) {
          if (err) res.status(500).json(err);
          res.json(updatedarticle);
        });
      });
    }
  })
  .get(function(req, res) {
    if (!validator.isMongoId(req.params.articleId)) {
      res.status(500).send('Invalid articleId');
    } else {
      Article.findById(req.params.articleId)
        .populate('notes')
        .exec(function(err, article) {
          if (err) res.status(500).json(err);
          else res.json(article);
        });
    }
  }); // end GET

// TODO expect a number
router.get('/scrape(/:pageNumber(d+))?', function(req, res) {
  // console.log('req.params.pageNumber:', req.params.pageNumber, '(' + typeof req.params.pageNumber + ')');
  let scrapeURLPage;
  req.params.pageNumber
    ? (scrapeURLPage = scrapeURL + 'page/' + req.params.pageNumber + '/')
    : (scrapeURLPage = scrapeURL);

  axios
    .get(scrapeURLPage)
    .then(function(response) {
      console.log('pulling articles from ', scrapeURLPage);

      // cheerio parse data stream
      const $ = cheerio.load(response.data);
      // console.log(response.data);

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
    .catch(function(err) {
      res.status(500).json(err);
    });
}); // end GET /scrape route

router.post('/notes', function(req, res) {
  let newNote = { ...req.body };
  console.log(newNote);

  // TODO verify that req.body.articleId is valid mongoid and that it refers to a real note
  Note.create(newNote)
    .then(function(mNote) {
      console.log('mNote:');

      console.log(JSON.stringify(mNote, '', 2));
      return Article.findOneAndUpdate(
        { _id: req.body.articleId },
        { $push: { notes: mNote._id } },
        { new: true }
      ).populate('notes');
    })
    .then(function(dbArticle) {
      console.log(JSON.stringify(dbArticle, '', 2));
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}); // end POST new note route

router.delete('/notes/:noteId', function(req, res) {
  // TODO: pull from Article.notes?

  Note.deleteOne({ _id: req.params.noteId }).then(function(result) {
    res.json(result);
  });
});

// TODO make it conditionally populate notes in saved view? and error handling
router.route('/articles').get(function(req, res) {
  Article.find()
    .sort('-publishDate')
    .populate('notes')
    .exec(function(err, articles) {
      res.json(articles);
    });
});

router.all('/echo', function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
