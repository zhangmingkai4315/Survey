var express = require('express');
var router = express.Router();
var Questions=require('../database/Questionaire.js');
var Comments=require('../database/Comment.js');
var Survey=require("../database/Survey.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: '调查问卷'});
});
router.get('/new', function (req,res,next) {
  res.render('new',{ title: '调查问卷'});
});
router.get('/show', function (req,res,next) {

  res.render('show',{ title: '调查问卷'});
});

module.exports = router;
