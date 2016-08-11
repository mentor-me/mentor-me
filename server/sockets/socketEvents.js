module.exports = function(io) {

  io.on('connection', function(socket){

    socket.on('chat mounted', function(conversationId) {
      console.log('************************ JOIN CHAT *************************')
      socket.emit('receive socket', socket.id);
      socket.join('room' + conversationId);
    });

    socket.on('disconnect chat', function(conversationId){
      console.log('************************ LEAVE CHAT ************************')
      socket.leave('room' + conversationId);

    })

    socket.on('new message', function(msg){
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
      socket.broadcast.to('room' + msg.conversationId).emit('message', msg);
    });

  });

}
