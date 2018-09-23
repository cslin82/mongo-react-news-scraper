const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
var request = require('request');
const axios = require('axios');

const Article = require('../../models/articleModel');
const Note = require('../../models/noteModel');

const scrapeURL = 'https://blog.mozilla.org/';

router.get('/savestory/:storyID', function(req, res) {
  console.log(req.params.storyID);

  Article.findById(req.params.storyID, function(err, article) {
    if (err) res.status(500).json(err);
    article.set({ saved: true });
    article.save(function(err, updatedarticle) {
      if (err) res.status(500).json(err);
      res.send(updatedarticle);
    });
  });
}); // end GET

// DRY this up later
router.get('/unsavestory/:storyID', function(req, res) {
  console.log(req.params.storyID);

  Article.findById(req.params.storyID, function(err, article) {
    if (err) res.status(500).json(err);
    article.set({ saved: false });
    article.save(function(err, updatedarticle) {
      if (err) res.status(500).json(err);
      res.send(updatedarticle);
    });
  });
}); // end GET

// DRY this up later
router.get('/togglestory/:storyID', function(req, res) {
  console.log(req.params.storyID);

  Article.findById(req.params.storyID, function(err, article) {
    if (err) res.status(500).json(err);
    article.set({ saved: !article.saved });
    article.save(function(err, updatedarticle) {
      if (err) res.status(500).json(err);
      res.json(updatedarticle);
    });
  });
}); // end GET

router.get('/scrape/:pageNumber', function(req, res) {
  console.log('req.params.pageNumber:', req.params.pageNumber, '(' + typeof req.params.pageNumber + ')');

  let scrapeURLPage = scrapeURL + 'page/' + req.params.pageNumber + '/';

  // make request from news site, pass stream
  request(scrapeURLPage, function(error, response, html) {
    if (error) {
      res.status(500).json(error);
    } else {
      console.log('pulling articles from ', scrapeURLPage);

      // cheerio parse data stream
      var $ = cheerio.load(html);

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
    } // end no error block
  }); // end request callback
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
  Article.find(function(err, articles) {
    res.json(articles);
  });
});

module.exports = router;
