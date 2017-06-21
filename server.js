var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/api/v1/negociacoes/default/:tipo', function (req, res) {
  console.log("GET /negociacoes/default");
  res.setHeader('Content-Type', 'application/json');

  if (req.params.tipo != 2) {
    var message = errorMessage('valorDiferenteDoEsperado', 'tipo');
    res.send(message);
  } else {
    var response = JSON.parse(fs.readFileSync('jsons/default.json', 'utf8'));
    res.send(response);
  }
});

app.get('/api/v1/paises/', function (req, res) {
  console.log('GET /paises');
  res.setHeader('Content-Type', 'application/json');
  var response = JSON.parse(fs.readFileSync('jsons/countries.json', 'utf8'));

  if (req.query != null && (req.query.q != null || req.query.limite != null)) {
    res.send(filterJson(response, req.query.limite, req.query.q));
  } else {
    res.send(response);
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port)
})

var errorMessage = function(reason, param) {
  var message = [];
  message[0] = {};
  message[0].motivo = reason;
  message[0].parametros = [];
  message[0].parametros[0] = param;
  return message;
}

var filterJson = function(json, limit, query) {
  if (query != null) {
    json = json.filter(function(i,n){
      var comp = i.nome.toUpperCase().indexOf(query.toUpperCase());
      return comp >= 0;
    });
  }
  if (limit != null && limit > 0) {
    json = json.slice(0, limit);
  }
  return json;
}
