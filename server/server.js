var express    = require('express');
var bodyParser = require('body-parser');
var moment     = require('moment');
var app        = express();
var morgan     = require('morgan');
var path       = require('path');
var jwt        = require('jsonwebtoken');
// var helpers    = require('./helpers/helpers.js');
var http       = require('http');
var formidable = require('formidable');
// var dotenv     = require('dotenv').config();

var db         = require('./db/db.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./'));

//Routing
// app.use('/api/', routesReview);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});

app.set('port', 3000);

app.listen(app.get('port'), function() {
  // db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});
