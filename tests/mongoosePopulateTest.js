const mongoose = require('mongoose');

const Article = require('../models/articleModel');
const Note = require('../models/noteModel');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

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
    Article.findById('5b2db52694c08956eb6b64a1')

      .populate('notes')
      .then(function(dbArticle) {
        console.log(JSON.stringify(dbArticle, '', 2));
      });
  });
