import axios from 'axios';
import { browserHistory } from 'react-router';
var ReactDOM = window.ReactDOM = require('react-dom');
import {
  GET_VIDEO_TOKEN

} from './actionTypes';

export function getToken(username) {

const endpoint = `/api/token/${username}`

      return function (dispatch) {
        axios.post(endpoint)
          .then(response => {
            console.log('inside response', response.identity)

            identity = response.identity;
            let accessManager = new Twilio.AccessManager(response.token);

            // Check the browser console to see your generated identity.
            // Send an invite to yourself if you want!
            console.log(identity);

            // Create a Conversations Client and connect to Twilio
            conversationsClient = new Twilio.Conversations.Client(accessManager);
            conversationsClient.listen().then(clientConnected, function (error) {
                console.log('Could not connect to Twilio: ' + error.message);

                function clientConnected() {
                    document.getElementById('invite-controls').style.display = 'block';
                    log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");

                    conversationsClient.on('invite', function (invite) {
                        log('Incoming invite from: ' + invite.from);
                        invite.accept().then(conversationStarted);
                    });
                    // Bind button to create conversation
                    document.getElementById('button-invite').onclick = function () {
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
                            conversationsClient.inviteToConversation(inviteTo, options).then(conversationStarted, function (error) {
                                log('Unable to create conversation');
                                console.error('Unable to create conversation', error);
                            });
                        }
                    };
                }



                unction conversationStarted(conversation) {
                    log('In an active Conversation');
                    activeConversation = conversation;
                    // Draw local video, if not already previewing

                    //****Component****//

                    // if (!previewMedia) {
                    //     ReactDOM.render(<ConversationContainer conversation={conversation} />,
                    //
                    // document.getElementById('local-conversation'));
                    // }
                    // When a participant joins, draw their video on screen
                    conversation.on('participantConnected', function (participant) {
                        log("Participant '" + participant.identity + "' connected");
                    });

                    // When a participant disconnects, note in log
                    conversation.on('participantDisconnected', function (participant) {
                        log("Participant '" + participant.identity + "' disconnected");
                    });

                    // When the conversation ends, stop capturing local video
                    conversation.on('disconnected', function (conversation) {
                        log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
                        ReactDOM.unmountComponentAtNode(document.getElementById('local-conversation'));
                        activeConversation = null;
                    });
                }

            dispatch({ type: GET_VIDEO_TOKEN });

          }).catch((err) => {
            console.log('createAppointment: ', err);
        });
      };
      }
