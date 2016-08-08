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
var authRoutes    = require('./routes/auth')

var db            = require('./db/db.js');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var config        = require('./config/config');

// Utilities
// require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
// app.use(session({secret: config.sessionSecret,
// 				 saveUninitialized: true,
// 				 resave: true}));

// Routing
app.use('/api', mentorsRoutes);
app.use('/api', learnerRoutes);
app.use('/api', authRoutes);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  // db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});


//For avoidong Heroku $PORT error

// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(app.get('port'), function() {
//     console.log('App is running, server is listening on port ', app.get('port'));
// });
