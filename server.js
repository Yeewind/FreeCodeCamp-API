var express = require('express')
var app = express()

app.use('/timestamp/', require('./api/timestamp.js'));
app.use('/requestheaderparser/', require('./api/request_header_parser.js'));
app.use('/urlshortener', require('./api/urlshortener.js'));

app.listen(8080);