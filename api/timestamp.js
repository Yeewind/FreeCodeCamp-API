var express = require('express')
var app = express()
var strftime = require('strftime')
var router = express.Router()

router.get('/:time', function (req, res) {
  var time = req.params.time;
  //determin type of input
  if (/\D/.test(time)) {
    //netural date
    time = Date.parse(time);
  } else {
    //unixtime
    time = Number(time) * 1000;
  }
  
  var output = {};
  if (isNaN(time)) {
    //input invalid
    output.unix = null;
    output.natural = null;
  } else {
    
    output.unix = time / 1000;
    output.natural = strftime('%B %d, %Y', new Date(time));
  }
  res.json(output);
    
  });

module.exports = router;