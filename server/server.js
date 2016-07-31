var express       = require('express');
var bodyParser    = require('body-parser');
var moment        = require('moment');
var app           = express();
var morgan        = require('morgan');
var path          = require('path');
var jwt           = require('jsonwebtoken');
var http          = require('http');
var formidable    = require('formidable');
var mentorsRoutes = require("./routes/mentors");
var learnerRoutes = require("./routes/learners");
var authRoutes    = require("./routes/auth");
var db            = require('./db/db.js');


// Utilities
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./'));

// Routing
app.use('/api', mentorsRoutes);
app.use('/api', learnerRoutes);
app.use('/api', authRoutes);



app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});


app.set('port', 3000);

app.listen(app.get('port'), function() {
  // db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});
