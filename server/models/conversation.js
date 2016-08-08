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


exports.fetchPublicAndPrivateConvos = function(req, res, learnerId) {
  db.Conversation.findAll({
    where: {
      $or: [
        {
          private: false
        },
        {$and: [
          {
            private: true
          },
          {
            learnerId: learnerId
          }
        ]}

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
