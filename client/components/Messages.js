import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import moment from 'moment';

import { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket } from '../actions/chat';

import Loader from './Loader';
import Message from './Message';
// const socket = io();

class Messages extends Component {

  componentWillMount() {
    let { conversationId } = this.props.params;
    /* Fetch messages from DB on mount */
    this.props.fetchMessages(conversationId);
  }

  componentDidMount() {

    let { conversationId } = this.props.params;
    /* Notify backend of socket */
    socket.emit('chat mounted', conversationId);
    /* Register socket ID */
    socket.on('receive socket', socketID => this.props.receiveSocket(socketID));
    /* When client recives msg, save to redux */
    socket.on('message', msg => {
      console.log('recieving message!', msg)
      this.props.saveMessage(msg);
    })
  }

  componentDidUpdate() {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentWillUnmount() {
    let { conversationId } = this.props.params;
    socket.emit('disconnect chat', conversationId)
    this.props.clearMessages();
  }

  handleSubmit(e) {
    let { postMessage, params } = this.props;
    let text = ReactDOM.findDOMNode(this.refs.msg).value;
    e.preventDefault();
    let newMessage = {
      content: text.trim(),
      userId: params.userId,
      conversationId: params.conversationId,
      createdAt: moment().format()
    }
    /* Post to back end */
    if (text) {
      socket.emit('new message', newMessage)
      postMessage(params.conversationId, newMessage);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  renderMessages() {
    let { params } = this.props;
    let { messages } = this.props.messages;
    return messages.map((msg, i) => <Message msg={ msg } userId={ params.userId } key={ i } />)
  }

  render() {

    let { loading } = this.props.messages;
    return (
      <div className="row conversation">
        <div className="card">
          <div className="card-block msg-container" ref="chatBox">
            { loading ? <Loader /> : this.renderMessages() }
          </div>
        </div>
        <div className="card text-input">
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <div className="form-group">
              <input className="form-control" ref="msg" autoComplete="off" type="text" id="msg-input" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat
  };
}

export default connect(mapStateToProps, { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket })(Messages)
