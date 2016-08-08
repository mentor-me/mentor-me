var router         = require("express").Router();
var _              = require('lodash');
var Messages  = require('../models/message');


// get all messages with that conversation Id
router.get('/conversations/:conversationId/messages', function(req, res) {
  var conversationId = req.params.conversationId;
  Messages.fetchMessages(req, res, conversationId);
});

// create a message associated to conversation and user
router.post('/conversations/:conversationId/messages', function(req, res) {
  var message = _.pick(req.body, 'content',
                        'userId');
  message.conversationId = req.params.conversationId;
  Messages.createMessage(req, res, message)
});


module.exports = router;
