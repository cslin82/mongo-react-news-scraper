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
    /* Article.find({}, function (err, docs) {
            if (err) throw err;

            console.log(JSON.stringify(docs));
        }) */

    let selArticle = Article.find({}, function(err, docs) {
      if (err) throw err;

      // console.log(JSON.stringify(docs));
    }).then(blahblah => {
      console.log(typeof blahblah);
      blahblah.update({ saved: true });
      console.log(JSON.stringify(blahblah));
      console.log(blahblah);
    });
  });

// .finally(
//     () => mongoose.connection.close()
// )
