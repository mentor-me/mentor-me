var db    = require('../db/db.js');
var async = require('async');


exports.fetchConversations = function(req, res, term){
  db.Conversation.findAll({})
    .then(function(conversations){
      res.status(200).send(conversations);
    })
    .catch(function(err){
      console.error('err', err.message);
      res.status(500).send(err.message);
    });
}


exports.fetchPublicAndPrivateConvos = function(req, res, userId) {
  db.Conversation.findAll({
    where: {
      $or: [
          {
            learnerId: userId
          },
          {
            mentorId:  userId
          }
      ]
  }
  })
    .then(function(conversations){
      res.status(200).send(conversations);
    })
    .catch(function(err){
      console.error('err', err.message);
      res.status(500).send(err.message);
    });

}

exports.startConversation = function(req, res, conversation){
  console.log("inside start conversation", conversation)
  db.Conversation.create(conversation)
  .then(function(conversation){
    res.status(200).send(conversation)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}


exports.findOrCreateConvos = function(req, res, convInfo, convName) {
  db.Conversation.findOrCreate({
    where: {
      name: convName
    },
    defaults: convInfo
  })
    .then(function(conversation){
      console.log(conversation[0])
      res.status(200).send(conversation[0]);
    })
    .catch(function(err){
      console.error('err', err.message);
      res.status(500).send(err.message);
    });

}

exports.findAllUnreadMessages = function(req, res, convoArr) {

      async.filter(convoArr, function(convoId, callback) {
        db.Message.findAll({
            where: {
              $and: [
                {conversationId: convoId},
                {read: false}
              ]

            }
        })
        .then(function(messages){
          console.log("this is the messages existance ", messages)
          var bool = messages.length > 0;
              callback(null, bool)
        })


    }, function(err, results) {
      console.log("this is the results array ",results)
      res.status(200).send(results)
        // results now equals an array of the existing files
    })

}

exports.markMessagesAsRead = function(req, res, convoId) {
  db.Message.update({read: true},{
      where: {
        $and: [
          {conversationId: convoId},
          {read: false}
        ]

      }
  })
  .then(function(results){
    console.log("this is the results from the update",results[0]);
    var recordNums = results[0];
    res.status(200).send("Number of messages updated to read " + recordNums)
  })
  .catch(function(err){
    console.error('err', err.message);
    res.status(500).send(err.message);
  });

}
