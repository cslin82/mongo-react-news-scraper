var express = require('express');
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

const Article = require('../models/articleModel')
const Note = require('../models/noteModel')

const scrapeURL = "https://blog.mozilla.org/";

router.get('/api/savestory/:storyID', function(req, res) {
    console.log(req.params.storyID);

    Article.findById(req.params.storyID, function (err, article) {
        if (err) return handleError(err);
      
        article.set({ saved: true });
        article.save(function (err, updatedarticle) {
          if (err) return handleError(err);
          res.send(updatedarticle);
        });
      });
}); // end GET /api

// DRY this up later
router.get('/api/unsavestory/:storyID', function(req, res) {
    console.log(req.params.storyID);

    Article.findById(req.params.storyID, function (err, article) {
        if (err) return handleError(err);
      
        article.set({ saved: false });
        article.save(function (err, updatedarticle) {
          if (err) return handleError(err);
          res.send(updatedarticle);
        });
      });
}); // end GET /api



router.get('/api/scrape/:pageNumber', function (req, res) {

    console.log('req.params.pageNumber:', req.params.pageNumber, '(' + typeof req.params.pageNumber + ')');
    
    let scrapeURLPage = scrapeURL + 'page/' + req.params.pageNumber + '/';

    // make request from news site, pass stream
    request(scrapeURLPage, function (error, response, html) {
      if (error) {
        res.status(500).json(error);
      } else {
        console.log('pulling articles from ', scrapeURLPage);
  
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
  
          let newArticle = new Article(newArticleObj)
            .save(function (err) {
              if (err) console.error(err);
              console.log('saved');
            });
        });
        res.send('scraped articles from '+ scrapeURLPage);
      } // end no error block
    }) // end request callback
  }) // end GET /scrape route


router.post('/api/article/:articleId', function (req, res) {
  let newNote = { ...req.body };
  console.log(newNote);

  Note.create(newNote)
    .then(function (mNote) {
      console.log('mNote:');

      console.log(JSON.stringify(mNote, '', 2));
      return Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: { notes: mNote._id } }, { new: true })
    })
    .then(function (dbArticle) {
      console.log(JSON.stringify(dbArticle, '', 2))
      res.json(dbArticle);
    })
}); // end POST new note route

router.post('/api/deletenote', function (req, res) {
  // TODO: pull from Article.notes
  
  Note.deleteOne({ _id: req.body.noteId })
  .then(function (result) {
    res.json(result)
    
  })
  



});


module.exports = router;
