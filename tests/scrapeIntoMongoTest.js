const mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

const scrapeURL = "https://blog.mozilla.org/";


const Article = require('../models/articleModel')
// const Note = require('../models/noteModel')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI)
    .then(
        () => {
            console.log('connected to ' + MONGODB_URI);
        },
        err => { throw err }
    )
    .then(
        () => {

            request(scrapeURL, function (error, response, html) {
                console.log('pulling articles from ', scrapeURL);
                
                // Load the HTML into cheerio and save it to a variable
                // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
                var $ = cheerio.load(html);

                // An empty array to save the data that we'll scrape
                var results = [];

                // With cheerio, find each p-tag with the "title" class
                // (i: iterator. element: the current element)
                $("article.post").each(function (i, element) {
                    let title = $('h2.entry-title', element).text().trim();

                    let url = $('a.go', element).attr("href").trim();

                    let author = $('address.vcard', element).text().trim();
                    let summary = $('div.entry-summary', element).text().trim();

                    summary = summary.slice(0, summary.indexOf('Read more') - 2).trim();
                    console.log('summary:', summary);

                    let newArticleObj = {
                        title,
                        url,
                        author,
                        summary,
                        saved: false
                    }

                    console.log(newArticleObj);
                    

                    let newArticle = new Article(newArticleObj)
                        .save(function (err) {
                            if (err) return handleError(err);
                            console.log('saved');
                            console.log(newArticle);
                            
                            
                            // saved!
                        });
                        


                });

            });


        }

    )

    // .finally(
    //     () => mongoose.connection.close()
    // )



