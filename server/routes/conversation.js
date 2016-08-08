var router         = require("express").Router();
var _              = require('lodash');
var Conversations  = require('../models/conversation');


// get all conversations
router.get('/conversations', function(req, res) {
  Conversations.fetchConversations(req, res);
});

// create a new private chat
router.post('/conversations/:userId', function(req, res) {
  var conversation = _.pick(req.body, 'name', 'private',
                        'mentorId');
  conversation.learnerId = req.params.userId;
  Conversations.startConversation(req, res, conversation)
});


// this route returns all channels includaing private channels for that user
router.get('/conversations/:userId', function(req, res) {
  var userId = req.params.userId;
  Conversations.fetchPublicAndPrivateConvos(req, res, userId);
})

module.exports = router;
