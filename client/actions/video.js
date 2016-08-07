import axios from 'axios';
var ReactDOM = window.ReactDOM = require('react-dom');
import VideoWindow from '../components/VideoWindow'
import React, { Component } from 'react';
import {browserHistory
} from 'react-router';

import {
GET_VIDEO_TOKEN
} from './actionTypes';

var conversationsClient;
var activeConversation;
var previewMedia;
var identity;

export function getToken(username) {

const endpoint = `/api/token/${username}`

return function(dispatch) {
    axios.get(endpoint)
    .then(response => {
          console.log('inside response', response)

          identity = response.data.identity;

          let accessManager = new Twilio.AccessManager(response.data.token);
          // Check the browser console to see your generated identity.
          // Send an invite to yourself if you want!
          console.log(identity);

          // Create a Conversations Client and connect to Twilio
          conversationsClient = new Twilio.Conversations.Client(accessManager);

          conversationsClient.listen().then(clientConnected, function(error) {
              console.log('Could not connect to Twilio: ' + error.message);
            });

          function clientConnected() {
              document.getElementById('invite-controls').style.display = 'block';
              console.log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");

              conversationsClient.on('invite', function(invite) {
                  console.log('Incoming invite from: ' + invite.from);
                  invite.accept().then(conversationStarted);
              });
              // Bind button to create conversation
              document.getElementById('button-invite').onclick = function() {
                  var inviteTo = document.getElementById('invite-to').value;
                  if (activeConversation) {
                      // Add a participant
                      activeConversation.invite(inviteTo);
                  } else {
                      // Create a conversation
                      var options = {};
                      if (previewMedia) {
                          options.localMedia = previewMedia;
                      }
                      conversationsClient.inviteToConversation(inviteTo, options).then(conversationStarted, function(error) {
                          console.log('Unable to create conversation');
                          console.error('Unable to create conversation', error);
                      });
                  }
              };
          }

          function conversationStarted(conversation) {
                console.log('In an active Conversation');
                // Draw local video, if not already previewing
                activeConversation = conversation;

                if (!previewMedia) {
                    ReactDOM.render(<VideoWindow conversation={conversation} />,
                    document.getElementById('local-conversation'));
                }

              //  When a participant joins, draw their video on screen
                conversation.on('participantConnected', function(participant) {
                    console.log("Participant '" + participant.identity + "' connected");
                });
                // When a participant disconnects, note in log
                conversation.on('participantDisconnected', function(participant) {
                    console.log("Participant '" + participant.identity + "' disconnected");
                });
                // When the conversation ends, stop capturing local video
                conversation.on('disconnected', function(conversation) {
                    console.log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
                    ReactDOM.unmountComponentAtNode(document.getElementById('local-conversation'));
                    activeConversation = null;
                });
            }

                dispatch({
                    type: GET_VIDEO_TOKEN
                });


      }).catch((err) => {
          console.log('Inside Catch error for GetToken: ', err);
      });
    }
}
