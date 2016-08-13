import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket, closeChatBox } from '../actions/chat';
import Message from './Message';
import Loader from './Loader';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: false
    }
  }

  componentDidMount() {

    // let { conversationId } = this.props.params;
    /* Notify backend of socket */
    // socket.emit('chat mounted', conversationId);
    /* Register socket ID */
    socket.on('receive socket', socketID => this.props.receiveSocket(socketID));
    /* When client recives msg, save to redux */
    socket.on('message', msg => {
      console.log('recieving message!', msg)
      this.newMessage(msg);
      // this.props.saveMessage(msg);
    })
  }

  componentWillReceiveProps() {
    this.setState({ loading: true })
    // let { currentChat } = this.props.params;
    let { currentConversation } = this.props.chat;
    const endpoint = `/api/conversations/${currentConversation}/messages`;
    axios.get(endpoint)
    .then(response => {
      this.setState({
        messages: response.data,
        loading: false
      }, () => this.scrollToBottom() )
    })
    .catch((err) => {
      console.log('fetchConversations Error: ', err);
    })
  }

  newMessage(msg) {
    this.setState({
      messages: [ ...this.state.messages, msg ]
    }, () => this.scrollToBottom() );
  }

  scrollToBottom() {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  handleSubmit(e) {
    console.log('submitted message');
    let { currentConversation } = this.props.chat;
    let user = JSON.parse(localStorage.getItem('user'));
    let text = ReactDOM.findDOMNode(this.refs.msg).value;
    e.preventDefault();
    var newMessage = {
      content: text.trim(),
      userId: user.id,
      conversationId: currentConversation,
      createdAt: moment().format()
    }
    if (text.length) {
      socket.emit('new message', newMessage);
      this.newMessage(newMessage);
      this.props.postMessage(currentConversation, newMessage);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  closeChatBox() {
    console.log('close chat box');
    this.props.closeChatBox();
  }

  startVideoChat() {
    console.log('start video box');
  }

  renderMessages() {
    let { messages } = this.state;
    // console.log('here are the messages', messages)
    return messages.map((msg, i) => <Message msg={ msg } userId={22} key={ i } />)
  }

  render() {

    let { open } = this.props.chat;
    let show = open ? 'show' : 'hide';
    let chatBox = `chatBox ${show}`;

    return (
      <div className={ chatBox }>
        <div className="utility-bar">
          <span className="title">Chat</span>
          <div className="icon-container">
            <i className="fa fa-video-camera" onClick={ this.startVideoChat.bind(this) } />
            <i className="fa fa-close" onClick={ this.closeChatBox.bind(this) } />
          </div>
        </div>
        <div className="text-window" ref="chatBox">
          { this.state.loading ? <Loader /> : this.renderMessages() }
        </div>
        <div className="input-box">
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
    chat: state.chat
  };
}

export default connect(mapStateToProps, { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket, closeChatBox })(ChatBox)
