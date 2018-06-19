var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    author: String,
    summary: String


});

var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
