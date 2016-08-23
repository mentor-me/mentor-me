import React, { Component } from 'react';
import * as actions from '../../actions/actionTypes.js'

export default class VideoWindow extends Component {

  componentDidMount() {
    const conversation = this.props.conversation;
    conversation.localMedia.attach(this.refs.localMedia);

    conversation.on('participantConnected', participant => {
      participant.media.attach(this.refs.remoteMedia);
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
    }

  render() {
    return (
      <div className="row">
        <div className="video-display">
        <div className="col-md-8">
          <div ref='remoteMedia' className='media-container remote-media'></div>
        </div>
        <div className="col-md-4">
          <div ref='localMedia' className='media-container local-media'></div>
        </div>
        </div>
      </div>
    );
  }
}

// remote is the person I am chatting with
// local is me
