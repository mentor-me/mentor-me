import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { fetchConversations, currentConversation, openChatBox, removeNotification, fetchMessages, clearMessages } from '../actions/chat';
import { signoutUser } from '../actions/auth';
import _ from 'underscore';


class Navbar extends Component {

  componentWillReceiveProps() {
    this.loadConversations();
  }

  renderNavClass(){
    console.log("this is the auth ", this.props.auth.authenticated)
    let divStyle = {backgroundColor:"transparent"}
    if(this.props.auth.authenticated){
      return;
    } else {
      return divStyle;
    }
  }

  loadChatMessages(convo) {
    console.log('clicked conversation!')
    let { chat, auth, chatBox } = this.props;
    let conversationWith = convo.name.replace(auth.currentUser.username, '')
    socket.emit('disconnect chat', chat.currentConversation.id);
    socket.emit('chat mounted', convo.id);
    // this.props.clearMessages();
    this.props.currentConversation({ id: convo.id, recipient: conversationWith });
    this.props.removeNotification( [convo.learnerId, convo.mentorId] );
    if (!chatBox.open) {
      this.props.openChatBox();
    }
    this.props.fetchMessages( convo.id );
  }

  notifyCheck(convoIDs) {
    let { chat } = this.props;
    let flag = false;
    if (_.contains(chat.notifications, convoIDs[0]) || _.contains(chat.notifications, convoIDs[1])){
      flag = true
    }
    return flag;
  }

  loadConversations() {
    let { chat, auth } = this.props;
    var notify;
    if(chat) {
      return chat.conversations.map((convo, i) => {
        let conversationWith = convo.name.replace(auth.currentUser.username, '');
        // if (convo.id == chat.currentConversation.id){
        //   notify = false;
        //   return <MenuItem eventKey={i} key={i} onClick={ () => this.loadChatMessages(convo) } > { conversationWith } { notify ? <i className="fa fa-circle" /> : '' } </MenuItem>
        // } else {
          if (this.notifyCheck([convo.learnerId, convo.mentorId])) {
            notify = true;
          } else {
            notify = false;
          }
          return <MenuItem eventKey={i} key={i} onClick={ () => this.loadChatMessages(convo) } > { conversationWith } { notify ? <i className="fa fa-comment-o" /> : '' } </MenuItem>
        // }
      }, this)
    }
  }

  renderNavLinks() {
    const { auth, signoutUser, chat } = this.props;

    if (auth.authenticated && auth.currentUser) {
      // call fetch conversations!
      /* This is navbar for logged in LEARNER */
      // auth.currentUser.secondary_role = 2
      if (auth.currentUser.secondary_role == "2") {
        return (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <DropdownButton eventKey="4" title={ chat.notifications.length ? <i className="fa fa-comments-o" /> : <i className="fa fa-comments-o none" /> } noCaret id="dropdown-no-caret">
                <MenuItem>Conversations ({chat.conversations.length}) </MenuItem>
                { this.loadConversations() }
              </DropdownButton>
            </li>
            <li className="nav-item">
              <Link to={`/learner/${auth.currentUser.username}/profile`} className="nav-link">
                <i className="fa fa-cog" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/learner/${auth.currentUser.username}`} className="nav-link">
                <i className="fa fa-th" />
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => signoutUser()}>
                Log Out
              </a>
            </li>
          </ul>
        );
      }
      /* This is navbar for logged in MENTOR */
      /* Need to clarify what secondary role is */
      // if (auth.currentUser.secondary_role) {
      else {
        return (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <DropdownButton eventKey="4" title={ chat.notifications.length ? <i className="fa fa-comments-o" /> : <i className="fa fa-comments-o none" /> } noCaret id="dropdown-no-caret">
                <MenuItem>Conversations ({chat.conversations.length}) </MenuItem>
                { this.loadConversations() }
              </DropdownButton>
            </li>
            <li className="nav-item">
              <Link to={`/mentor/${auth.currentUser.username}/profile`} className="nav-link">
                <i className="fa fa-cog" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/mentor/${auth.currentUser.username}/calendar`} className="nav-link">
                <i className="fa fa-calendar" />
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => signoutUser()}>
                Log Out
              </a>
            </li>
          </ul>
        );
      }
    }
    if (!auth.authenticated) {
      return (
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to={"/become"} className="nav-link">Become a Mentor</Link>
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">Log In</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top" style={this.renderNavClass()}>
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              <img src="/client/assets/images/logo.png" id="logo" />
            </Link>
              {this.renderNavLinks()}
          </div>
        </nav>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    chat: state.chat,
    chatBox: state.chatBox
  };
}

export default connect(mapStateToProps, { signoutUser, fetchConversations, currentConversation, openChatBox, removeNotification, fetchMessages, clearMessages })(Navbar);
