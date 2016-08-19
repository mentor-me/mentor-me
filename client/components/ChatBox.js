import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import Linkify from 'react-linkify';
import { Link, browserHistory } from 'react-router';

import { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket, closeChatBox, addNotification } from '../actions/chat';
import Message from './Message';
import Loader from './Loader';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: false
    }
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    /* Notify backend of socket */
    let { currentConversation } = this.props.chat;

    socket.emit('chat mounted', currentConversation.id);
    /* Register socket ID */
    socket.on('receive socket', socketID => {
      // console.log('RECIEVING SOCKET ID: ', socketID)
      this.props.receiveSocket(socketID)
    });

    socket.on('message', msg => {
      console.log('RECIEVING MESSAGE FROM SOCKET: ', msg)
      this.newMessage(msg);
    })

    socket.on('notification', data => {
      console.log('RECIEVING NOTIFICATION FROM SOCKET: ', data)
      this.props.addNotification(data.id)
    });

  }

  componentWillReceiveProps(nextProps) {
    let { messages } = this.props;
    // if (messages.length && nextProps.messages.length) {
      // if (nextProps.messages[0].conversationId && messages[0].conversationId) {
        if (nextProps.messages[0].conversationId !== messages[0].conversationId ) {
          this.setState({
            messages: [...nextProps.messages],
            loading: false
          }, () => this.scrollToBottom() )
        }
      // }
    // }
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
      conversationId: currentConversation.id,
      createdAt: moment().format()
    }
    if (text.length) {
      socket.emit('new message', newMessage);
      socket.emit('global message', {
        id: currentConversation.id,
        recipient: currentConversation.recipient,
        from: user.id
      });
      this.newMessage(newMessage);
      this.props.postMessage(currentConversation.id, newMessage);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  closeChatBox() {
    console.log('close chat box');
    this.props.closeChatBox();
  }

  startVideoChat() {
    //push history!
    let { auth } = this.props;
    let { currentConversation } = this.props.chat;
    // let user = JSON.parse(localStorage.getItem('user'));
    let inviteeRole;
    let invitorRole;
    auth.currentUser.secondary_role == "2" ? inviteeRole = 'mentor' : inviteeRole = 'learner'
    auth.currentUser.secondary_role == "2" ? invitorRole = 'learner' : invitorRole = 'mentor'
    let videoLink = `Click here to join video chat: http://localhost:3000/${inviteeRole}/${auth.currentUser.username}/videochat/${auth.currentUser.id}`;
    var newMessage = {
      content: videoLink,
      userId: auth.currentUser.id,
      conversationId: currentConversation.id,
      createdAt: moment().format()
    }
    socket.emit('new message', newMessage);
    socket.emit('global message', {
      id: currentConversation.id,
      recipient: currentConversation.recipient,
      from: auth.currentUser.id
    });
    // TODO: NOT POSTING TO DB!!!
    // this.newMessage(newMessage);
    browserHistory.push(`/${invitorRole}/${auth.currentUser.username}/videochat/${auth.currentUser.id}`)
    // this.props.postMessage(currentConversation.id, newMessage);
  }

  renderMessages() {
    // let user = JSON.parse(localStorage.getItem('user'));
    let { auth } = this.props;
    let { messages } = this.state;
    if (messages.length && auth.currentUser.id) {
      return messages.map((msg, i) => <Message msg={ msg } userId={auth.currentUser.id} key={ i } />)
    }
  }

  render() {

    let { messages, loading, currentConversation } = this.props;
    let { open } = this.props.chatBox;
    let show = open ? 'show' : 'hide';
    let chatBox = `chatBox ${show}`;

    return (
      <div className={ chatBox }>
        <div className="utility-bar">
          <span className="title"> { currentConversation.recipient } </span>
          <div className="icon-container">
            <i className="fa fa-video-camera" onClick={ this.startVideoChat.bind(this) } />
            <i className="fa fa-close" onClick={ this.closeChatBox.bind(this) } />
          </div>
        </div>
        <div className="text-window" ref="chatBox">
          { loading && messages ?  <Loader /> : this.renderMessages() }
          {/*{ this.state.messages.length ?  this.renderMessages() : <Loader /> }*/}
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
    currentConversation: state.chat.currentConversation,
    chat: state.chat,
    loading: state.chat.loading,
    chatBox: state.chatBox,
    auth: state.auth,
    messages: state.chat.messages
  };
}

export default connect(mapStateToProps, { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket, closeChatBox, addNotification })(ChatBox)
