import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchConversations } from '../actions/chat';
import ConversationRecord from './ConversationRecord';

class Conversations extends Component {

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.fetchConversations(user.id)
  }

  loadConversations() {
    let { chat, auth } = this.props;
    if(chat) {
      return chat.conversations.map((convo, i) => {
        if (auth.secondary_role == 2) {
          let link = `/learner/${auth.username}/conversations/${auth.id}/${convo.id}`;
          return <ConversationRecord key={ i } currentUser={auth} convo={ convo } link={ link } />
        } else {
          let link = `/mentor/${auth.username}/conversations/${auth.id}/${convo.id}`;
          return <ConversationRecord key={ i } currentUser={auth} convo={ convo } link={ link } />
        }
      })
    }
  }

  render() {
    let { conversations } = this.props.chat;
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
                { conversations.length ? this.loadConversations() : 'Your inbox is currently empty.' }
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
