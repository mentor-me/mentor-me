var moment = require('moment');
var clientInfo = {};

exports = module.exports = function(io) {

  io.on('connection', function(socket){
    console.log('User connected via socket.io!');
    console.log('SOCKET ID: ', socket.id)

    // Handle disconnect
    socket.on('disconnect', function(){
      var userData = clientInfo[socket.id];
      if(typeof clientInfo[socket.id] !== 'undefined') {
        console.log('DISCONNECT!!!!!!!')
        socket.leave(userData.conversationId);
        delete clientInfo[socket.id];
      }
    });

    // Store conversation data on connection
    socket.on('joinConversation', function(req) {
      clientInfo[socket.id] = req;
      console.log('client info object----', clientInfo)
      socket.join(req.conversationId);
    })

    // Handle message from single client
    socket.on('message', function(message){
      socket.broadcast.to(clientInfo[socket.id].conversationId).emit('message', message);
    });



  });

}
