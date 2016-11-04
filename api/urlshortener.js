var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var router = express.Router();
var shortenerURL = 'https://freecodecamp-api-jxchen.c9users.io/urlshortener/';  //host url

router.get('/new/*', function (req, res) {
    var orginal_url = req.params[0];  // get orginal_url
    mongo.connect('mongodb://localhost:27017/url_shortener', function(err, db) {
        if (err) throw err;
        var url = db.collection('url');
        url.findOne({
            orginal_url: orginal_url
        }, function(err, data) {
            if (err) throw err;
            if (data) {   //url exists
                db.close();
                //get short_url stored
                res.json({  
                    orginal_url: orginal_url,
                    short_url: shortenerURL + data._id
                });
            } else {      //insert new
                //get id counter info
                url.findOne({
                    _id: "counter"
                }, function(err, data) {
                    if(err) throw err;
                    var count = data.count + 1;
                    //insert URL
                    url.insert({
                        orginal_url: orginal_url,
                        _id: count
                    }, function (err, out) {
                        if (err) throw err;
                        //update counter
                        url.update({
                            _id: "counter"
                        }, {
                            $set: {count: count}
                        }, function(err, succ) {
                            if (err) throw err;
                            db.close();
                            res.json({
                                orginal_url: orginal_url,
                                short_url: shortenerURL + count
                            });
                        });
                    });
                });
            }
        });
    });
});

router.get('/:short_url', function (req, res) {    //get URL
  var short_url = Number(req.params.short_url);  // transfer to Number
  mongo.connect("mongodb://localhost:27017/url_shortener", function(err, db) {
      if(err) throw err;
      var url = db.collection('url');
      url.findOne({
          _id: short_url
      }, function(err, data){
          if(err) throw err;
          db.close();
          if (!data) {
              console.log("not find");
              res.json({
                 error: "This url is not on the database." 
              });
              res.end();
          } else {
              if (data) console.log("find");
          res.redirect(data.orginal_url);
          res.end();
          }
          
      });
  });
});
module.exports = router;

