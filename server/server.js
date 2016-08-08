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
var conversationsRoutes = require("./routes/conversation");
var messagesRoutes = require("./routes/message");
var learnerRoutes = require("./routes/learners");
var authRoutes    = require('./routes/auth')
var db            = require('./db/db.js');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var config        = require('./config/config');
// sockets
var socketIo      = require('socket.io');
var server        = http.createServer(app);
var io            = socketIo(server);


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
app.use('/api', conversationsRoutes);
app.use('/api', messagesRoutes);
app.use('/api', authRoutes);



app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});


app.set('port', 3000);
server.listen(app.get('port'), function() {
  // db.ensureSchema();
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});
