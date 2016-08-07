import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionTypes.js'


class VideoChatPage extends Component {

  componentWillMount() {
      this.props.getToken(this.props.auth.currentUser.id)
  }

  previewMyCamera () {
      if (!previewMedia) {
          previewMedia = new Twilio.Conversations.LocalMedia();
          Twilio.Conversations.getUserMedia().then(
          function (mediaStream) {
              previewMedia.addStream(mediaStream);
              previewMedia.attach(this.refs.myVideo);
          },
          function (error) {
              console.error('Unable to access local media', error);
              log('Unable to access Camera and Microphone');
          });
      };
  };




  render() {

    return (
      <div id="controls">

        <div id="preview">
          <p className="instructions">Hello Beautiful</p>
          <div id="local-conversation" ref='myVideo'>
          <ConversationContainer conversation={conversation} />
          </div>
          <button id="button-preview">Preview My Camera</button>
        </div>

        <div id="invite-controls">
          <p className="instructions">Invite another Video Client</p>
          <input id="invite-to" type="text" placeholder="Identity to send an invite to" />
          <button id="button-invite">Send Invite</button>
        </div>

        <div id="log">
          <p>&gt;&nbsp;<span id="log-content">Preparing to listen</span>...</p>
        </div>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    appointments: state.learner.appointments,
    auth: state.auth,
    mentor: state.learner.currentMentor
  };
}

export default connect(mapStateToProps, { actions })(VideoChatPage);
