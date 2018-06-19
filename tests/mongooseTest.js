const mongoose = require("mongoose");

const Article = require('../models/articleModel')
const Note = require('../models/noteModel')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

