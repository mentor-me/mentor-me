import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken } from '../actions/video.js'
import VideoWindow from './VideoWindow'

export default class VideoChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  startChat(){
    // console.log("inside startChat function")
    this.props.getToken(this.props.auth.currentUser.username)
  }

  previewMyCamera () {

    let previewMedia;

      if (!previewMedia) {
          previewMedia = new Twilio.Conversations.LocalMedia();
          Twilio.Conversations.getUserMedia().then(
          function (mediaStream) {
              previewMedia.addStream(mediaStream);
              previewMedia.attach('#local-conversation');
          },
          function (error) {
              console.error('Unable to access local media', error);
              console.log('Unable to access Camera and Microphone');
          });
      };
  };


  render() {

    return (
      <div id="controls">
        <div id="preview">
          <p className="instructions">Hello Beautiful</p>
          <div id="local-conversation" ref='localMedia'>

          </div>
          <div>
            <button className="btn-global" onClick={this.startChat.bind(this)}>Get Token</button>
          </div>
          <button onClick={this.previewMyCamera.bind(this)} id="button-preview">Preview My Camera</button>
        </div>

        <div id="invite-controls">
          <p className="instructions">Invite another Video Client</p>
          <input id="invite-to" type="text" placeholder="Identity to send an invite to" />
          <button id="button-invite">Send Invite</button>
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

export default connect(mapStateToProps, { getToken })(VideoChatPage);
