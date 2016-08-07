import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoChatPage extends Component {

  render() {

    return (
      <div id="controls">

        <div id="preview">
          <p className="instructions">Hello Beautiful</p>
          <div id="local-conversation">
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

export default connect(null, { actions })(VideoChat);
