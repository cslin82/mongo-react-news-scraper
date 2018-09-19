var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  summary: String,
  saved: Boolean,
  publishDate: Date,

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

var Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
