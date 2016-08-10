import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import moment from 'moment';

import { fetchMessages, postMessage, clearMessages, saveMessage } from '../actions/chat';

import Message from './Message';
const socket = io();

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let { conversationId } = this.props.params;
    /* Fetch messages from DB on mount */
    this.props.fetchMessages(conversationId);
    /* Register socket in room with correct ID */
    socket.emit('joinConversation', {
      conversationId: conversationId
    });
    /* When client recives msg, save to redux */
    socket.on('message', message => {
      this.props.saveMessage(message);
    })
  }

  componentDidUpdate() {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentWillUnmount() {
    this.props.clearMessages();
  }

  handleInputChange(e) {
    this.setState({ msg: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    let { postMessage, params } = this.props;
    let timeNow = moment().format();
    let data = {
      content: this.state.msg,
      userId: params.userId,
      createdAt: timeNow
    }
    socket.emit('message', data)
    /* Post to back end */
    if (this.state.msg.length) {
      postMessage(params.conversationId, data);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  render() {

    let { messages } = this.props.chat;

    return (
      <div className="row conversation">
        <div className="card">
          <div className="card-block msg-container" ref="chatBox">
            { messages ? messages.map((msg, i) => <Message msg={ msg } key={ i } />) : '' }
          </div>
        </div>
        <div className="card text-input">
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input className="form-control" ref="msg" onChange={ this.handleInputChange } type="text" id="msg-input" />
              <button type="submit" className="btn-global">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat
  };
}

export default connect(mapStateToProps, { fetchMessages, postMessage, clearMessages, saveMessage })(Messages)
