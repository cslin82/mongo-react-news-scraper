var cheerio = require("cheerio");
var request = require("request");


// const scrapeURL = "https://www.npr.org/sections/news/";
const scrapeURL = "https://blog.mozilla.org/";

// First, tell the console what server.js is doing
console.log(`Scraping ${scrapeURL}`);

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request(scrapeURL, function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // console.log(html.length);
  

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("article.post").each(function(i, element) {
    let title = $('h2.entry-title', element).text().trim();
    // console.log('title:', title)

    let url = $('a.go', element).attr("href").trim();
    // console.log('url:', url);
    
    let author = $('address.vcard', element).text().trim();
    // console.log('author:', author);
    
    // console.log('summary block:', $('div.entry-summary', element).remove('a').text())
    // console.log('summary block:', $('div.entry-summary', element).remove('a').html())
    let summary = $('div.entry-summary', element).text().trim();
    
    summary = summary.slice(0, summary.indexOf('Read more') - 2).trim();
    // console.log('summary:', summary);
    
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title,
      url,
      author,
      summary
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
