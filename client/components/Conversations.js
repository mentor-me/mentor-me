import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchConversations } from '../actions/chat';
import ConversationRecord from './ConversationRecord';

class Conversations extends Component {

  componentWillMount() {
    this.props.fetchConversations(1)
  }

  loadConversations() {

    let { chat, auth } = this.props;
    if(chat) {
      return chat.conversations.map((convo, i) => {
          return <ConversationRecord key={ i } currentUser={auth} convo={ convo } />
      })
    }

  }

  render() {
    return (
      <div className="messages">
        <div className="row">
          <h4>Your Conversations</h4>
        </div>
        <div className="row">
        <div className="card">
          <div className="card-block">
            <table className="table table-hover">
              <tbody>
                { this.loadConversations() }
              </tbody>
            </table>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat,
    auth: state.auth.currentUser
  };
}

export default connect(mapStateToProps, { fetchConversations })(Conversations)
