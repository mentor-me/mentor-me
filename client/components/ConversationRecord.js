import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import { currentConversation, openChatBox } from '../actions/chat';

class ConversationRecord extends Component {

  onConversationEntryClick() {

    let { convo, chat } = this.props;

    socket.emit('disconnect chat', chat.currentConversation);
    socket.emit('chat mounted', convo.id);
    this.props.currentConversation( convo.id );
    this.props.openChatBox();

  }

  render() {

    let { convo, currentUser, link } = this.props;
    let conversationWith = convo.name.replace(currentUser.username, '')

    return (
      <tr onClick={ () => this.onConversationEntryClick() }>
        <td> <i style={{'marginRight':'3px'}} className="fa fa-user" /> { conversationWith } </td>
        {/*<td> { moment( convo.updatedAt ).format('[Started on] M/D/YY [at] h:mm a') } </td>*/}
        <td> { moment( convo.updatedAt ).format('[Started on] M/D/YY') } </td>
        <td> <i className="fa fa-comments-o" /> </td>
      </tr>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat
  };
}

export default connect(mapStateToProps, { currentConversation, openChatBox })(ConversationRecord)
