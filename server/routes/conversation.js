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


// create find or create by name(the name is unique)
router.post('/conversations', function(req, res) {
  var convInfo = _.pick(req.body, 'name', 'private',
                            'mentorId', 'learnerId')
  var convName     = req.body.name;
  Conversations.findOrCreateConvos(req, res, convInfo, convName);
})

module.exports = router;

// get an array of conversations and return those with unread emails

router.put('/conversations/unread', function(req, res){
    var convoArr = req.body.conversations;
    Conversations.findAllUnreadMessages(req, res, convoArr);
});

router.put('/conversations/:convoId', function(req, res){
    var convoId = req.params.convoId;
    Conversations.markMessagesAsRead(req, res, convoId);
});
