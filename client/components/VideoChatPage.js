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
      <div className="row">
        <div className="col-xs-12">
        <div className="video-login">
          <div id="controls">
            <div id="preview">
              <h2 className="header-tag">Video Chat</h2>
              <h1 className="sub-header">Start you <em>video chat</em> session now</h1>
              <div id="local-conversation" ref='localMedia'>

              </div>
                <button className="btn-global" onClick={this.startChat.bind(this)}>Get Token</button>
              <button onClick={this.previewMyCamera.bind(this)} id="button-preview"><i className="fa fa-video-camera" aria-hidden="true"></i>Preview My Camera</button>
            </div>
            <div className="clear"></div>

            <div id="invite-controls">
              <p className="instructions">Invite another Video Client</p>
              <input id="invite-to" type="text" placeholder="Identity to send an invite to" />
              <button id="button-invite">Send Invite</button>
            </div>
          </div>
          </div>
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


// this is for the opening video page
