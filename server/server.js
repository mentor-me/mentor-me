var express       = require('express');
var bodyParser    = require('body-parser');
var moment        = require('moment');
var app           = express();
var morgan        = require('morgan');
var path          = require('path');
var jwt           = require('jsonwebtoken');
var http          = require('http');
var https         = require('https');
var formidable    = require('formidable');
var mentorsRoutes = require("./routes/mentors");
var learnerRoutes = require("./routes/learners");
var authRoutes    = require('./routes/auth');
var conversationRoutes  = require('./routes/conversation')
var messageRoutes  = require('./routes/message')
var db            = require('./db/db.js');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var config        = require('./config/config');
// sockets
var server        = http.createServer(app);
// var server        = https.createServer(app);
var socketIo      = require('socket.io')

//Sendgrid

// var username = 'chadd1783';
// var password = 'Password123';
//
// var sendgrid      = require('sendgrid')(username, password)
var router    = require("express").Router();

var sendgrid = require('sendgrid')("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");
console.log(sendgrid)

var email = new sendgrid.Email();

email.addTo("chadd.d.bennett@gmail.com");
email.setFrom("chadd1783@gmail.com");
email.setSubject("Sending with SendGrid is Fun");
email.setHtml("and easy to do anywhere, even with Node.js");

sendgrid.send(email);

// router.get('/', function(req, res){
// 	sendgrid.send({
// 		to: 'chadd.d.bennett@gmail.com',
// 		from: 'chadd1783@gmail.com',
// 		subject: 'hello world',
// 		text: 'dafsdasaf'
// 	}, function(err, json){
// 		if(err){ return res.send('aaaahhhhhh!');}
// 		res.send('wooo hooo!')
// 	})
// })


// Utilities
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./'));
// app.use(session({secret: config.sessionSecret,
// 				 saveUninitialized: true,
// 				 resave: true}));

// Routing
app.use('/api', mentorsRoutes);
app.use('/api', learnerRoutes);
app.use('/api', authRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});

// Sockets
var io = new socketIo(server)
require('./sockets/socketEvents')(io);

app.set('port', 3000);
server.listen(app.get('port'), function() {
  // db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});
