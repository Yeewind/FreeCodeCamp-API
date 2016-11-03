var express = require('express')
var app = express()
var strftime = require('strftime')
var router = express.Router()

router.get('/', function (req, res) {
  console.log(req);
  var output = {
    IP: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'],
    //match the first string in the bracket, and display without bracket
    OS: req.headers['user-agent'].match(/\((.*?)\)/)[1],
  }
  

  res.json(output);
    
  });

module.exports = router;