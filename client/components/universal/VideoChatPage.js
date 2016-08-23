import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getToken } from '../../actions/video.js'
import VideoWindow from './VideoWindow'
import Loader from './Loader';

export default class VideoChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    console.log("inside component did mount!!!!!!")
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.getToken(user.username)
    ReactDOM.findDOMNode(this.refs.invitor).value = this.props.params.username;

  }

  startChat(){
    // console.log("inside startChat function")
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.getToken(user.username)
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

    let user = JSON.parse(localStorage.getItem('user'));
    let show = this.props.params.uid == user.id ? 'hide' : 'show-prompt';
    let inverseShow = this.props.params.uid == user.id ? 'show-prompt' : 'hide';

    return (
      <div className="row">
        <div className="col-xs-12">
        <div className="video-login">
          <div id="controls">
            <div id="preview">
              <h2 className="header-tag">Video Chat</h2>
              <h1 className="sub-header">Start your <em>video chat</em> session now</h1>
              <div id="local-conversation" ref='localMedia'>
              </div>
              {/*<button className="btn-global" onClick={this.startChat.bind(this)}>Get Token</button>
              <button onClick={this.previewMyCamera.bind(this)} id="button-preview"><i className="fa fa-video-camera" aria-hidden="true"></i>Preview My Camera</button>*/}
            </div>
            <div className="clear"></div>
            <div id="invite-controls" className={show}>
              <span className={inverseShow}> <Loader /> </span>
              {/*<p className="instructions">Invite another Video Client</p>*/}
              <input id="invite-to" type="text" ref="invitor" placeholder="Identity to send an invite to" />
              <button id="button-invite">Click here to start now!</button>
              <button id="button-disconnect">Click here to disconnect now!</button>
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
