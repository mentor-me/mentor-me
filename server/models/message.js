var db    = require('../db/db.js');
var async = require('async');

exports.fetchMessages = function(req, res, conversationId) {
  db.Message.findAll({
    where: {conversationId: conversationId}
  })
    .then(function(messages){
      res.status(200).send(messages);
    })
    .catch(function(err){
      console.error('err', err.message);
      res.status(500).send(err.message);
    });
}

exports.createMessage = function(req, res, message) {
  console.log("inside create message", message)
  db.Message.create(message)
  .then(function(message){
    res.status(200).send(message)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })


}
