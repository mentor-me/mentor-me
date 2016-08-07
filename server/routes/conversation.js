var router         = require("express").Router();
var _              = require('lodash');
var Conversations  = require('../models/conversations');


// get all conversations
router.get('/conversations', function(req, res) {
  Conversations.fetchConversations(req, res);
});

// create a new private chat
router.post('/conversations/:userId', function(req, res) {
  var conversation = _.pick(req.body, 'name', 'private',
                        'mentorId');
  conversation.learnerId = req.params.learnerId;
  Conversations.startConversation(req, res, conversation)
});


// this route returns all channels including private channels for that user
router.get('/conversations/:learnerId', function(req, res) {
  var userId = req.params.learnerId;
  Conversations.fetchPublicAndPrivateConvos(req, res, learnerId);
})
