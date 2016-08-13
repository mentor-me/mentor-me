import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';

import { fetchMessages, postMessage, clearMessages, saveMessage, receiveSocket } from '../actions/chat';

import Loader from './Loader';
import Message from './Message';

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true })
    let { conversationId } = this.props.params;
    const endpoint = `/api/conversations/${conversationId}/messages`;
    axios.get(endpoint)
    .then(response => {
      console.log(response.data)
      this.setState({
        messages: response.data,
        loading: false
      })
    })
    .catch((err) => {
      console.log('fetchConversations Error: ', err);
    })
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
      this.newMessage(msg);
      // this.props.saveMessage(msg);
    })
  }

  newMessage(msg) {
    this.setState({
      messages: [ ...this.state.messages, msg ]
    });
  }

  componentDidUpdate() {
    const chatBox = this.refs.chatBox;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentWillUnmount() {
    let { conversationId } = this.props.params;
    socket.emit('disconnect chat', conversationId);
  }

  handleSubmit(e) {
    let { postMessage, params } = this.props;
    let text = ReactDOM.findDOMNode(this.refs.msg).value;
    e.preventDefault();
    var newMessage = {
      content: text.trim(),
      userId: params.userId,
      conversationId: params.conversationId,
      createdAt: moment().format()
    }
    /* Post to back end */
    if (text.length) {
      socket.emit('new message', newMessage);
      this.newMessage(newMessage);
      postMessage(params.conversationId, newMessage);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  renderMessages() {
    let { params } = this.props;
    let { messages } = this.state;
    console.log('here are the messages', messages)
    return messages.map((msg, i) => <Message msg={ msg } userId={ params.userId } key={ i } />)
  }

  render() {

    let { loading } = this.props.messages;
    let { messages } = this.state;

    return (
      <div className="row conversation">
        <div className="card">
          <div className="card-block msg-container" ref="chatBox">
            { this.state.loading ? <Loader /> : this.renderMessages() }
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
