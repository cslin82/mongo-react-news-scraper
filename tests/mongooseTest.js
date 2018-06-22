const mongoose = require("mongoose");

const Article = require('../models/articleModel')
const Note = require('../models/noteModel')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI)
.then(
    () => { console.log('connected to ' + MONGODB_URI);
     },
    err => { throw err }
)
.then(
    () => {
        Article.find({}, function (err, docs) {
            if (err) throw err;

            console.log(JSON.stringify(docs));
        })

        // var newArticle = new Article({
        //     title: "title2",
        //     author: "author2",
        //     url: "http://www.google.com/2",
        //     summary: "summary 2 lorem ipsum yadda yadda",
        //     saved: false



        // })
        // .save(function (err) {
        //     if (err) return handleError(err);
        //     // saved!
        //   })
    }

)

// .finally(
//     () => mongoose.connection.close()
// )



