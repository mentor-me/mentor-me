module.exports = function(io) {
  io.on('connection', function(socket){
    socket.once('disconnect', function() {
      console.log(':.:.:.:. socket disconnected.')
    });
    socket.on('join global', function(username) {
      socket.join(username);
      console.log(':.:.:.:. join global user room ' + username)
    });
    // { for: recievingUserName, from: sendingUserName }
    socket.on('global message', function(data){
      console.log(':.:.:.:. global message recieved: ' + data)
      console.log(':.:.:.:. global message destructured: ' + data.id)
      /// RIGHT HERE STUCK
      socket.broadcast.to(data.recipient).emit('notification', data);
    });
    socket.on('chat mounted', function(conversationId) {
      socket.emit('receive socket', socket.id);
      socket.join('room' + conversationId);
      console.log(':.:.:.:. socket joined room ' + conversationId)
    });
    socket.on('disconnect chat', function(conversationId){
      socket.leave('room' + conversationId);
      console.log(':.:.:.:. socket left room ' + conversationId)
    })
    socket.on('new message', function(msg){
      console.log(':.:.:.:. socket broadcasted message: ' + msg.content)
      socket.broadcast.to('room' + msg.conversationId).emit('message', msg);
    });
  });
}
