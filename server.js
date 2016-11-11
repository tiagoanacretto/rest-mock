var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/listSome', function (req, res) {
  console.log("GET /listSome");
  res.end('[{"something":"anything"}]');
});

app.post('/addSome', function (req, res) {
  console.log('POST addSome')
  console.log(req.body);
  res.end('{"result":"ok"}');
});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})
