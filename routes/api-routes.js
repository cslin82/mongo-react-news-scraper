var express = require('express');
var router = express.Router();

var cheerio = require("cheerio");
var request = require("request");

var mongoose = require("mongoose");

router.get('/api/story/:storyID', function(req, res) {
    console.log(req.params.storyID);
    

    res.json(req.params.storyID)
    
    
}); // end GET /api


module.exports = router;
