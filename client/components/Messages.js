import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { fetchMessages, postMessage } from '../actions/chat';

import Message from './Message';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessages(this.props.params.conversationId)
  }

  handleInputChange(e) {
    this.setState({ msg: e.target.value })
    console.log(this.state.msg)
  }

  loadMessages() {
    let { messages } = this.props.chat;
    if(messages) {
      return messages.map((msg, i) => {
          return <Message key={ i } msg={ msg } />
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { postMessage, params } = this.props;
    let data = {
      content:this.state.msg,
      userId: params.userId
    };
    if (this.state.msg.length) {
      postMessage(params.conversationId, data);
    }
    ReactDOM.findDOMNode(this.refs.msg).value = '';
  }

  render() {
    return (
      <div className="row conversation">
        <div className="card">
          <div className="card-block msg-container">
            { this.loadMessages() }
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

export default connect(mapStateToProps, { fetchMessages, postMessage })(Messages)
