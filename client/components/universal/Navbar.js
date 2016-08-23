import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { signoutUser } from '../../actions/auth';
import _ from 'underscore';
import { fetchConversations,
         currentConversation,
         openChatBox,
         removeNotification,
         fetchMessages,
         clearMessages,
         markAsRead
       } from '../../actions/chat';

class Navbar extends Component {

  componentWillReceiveProps() {
    this.loadConversations();
  }

  renderNavClass(){
    // console.log("this is the auth ", this.props.auth.authenticated)
    let divStyle = {backgroundColor:"transparent"}
    if(this.props.auth.authenticated){
      return;
    } else {
      return divStyle;
    }
  }

  loadChatMessages(convo) {
    // console.log('clicked conversation!', convo);
    let mentorObj;
    let { chat, auth, chatBox, mentorList } = this.props;
    let conversationWith = convo.name.replace(auth.currentUser.username, '');
    socket.emit('disconnect chat', chat.currentConversation.id);
    socket.emit('chat mounted', convo.id);
    if (auth.currentUser.secondary_role == "2") {
      mentorObj = mentorList.filter(mentor => mentor.username == conversationWith);
    } else {
      mentorObj = [{ availability: false }];
    }
    this.props.currentConversation({
      id: convo.id,
      recipient: conversationWith,
      availability: mentorObj[0].availability ? true : false
    });
    this.props.removeNotification(convo.id);
    this.props.markAsRead(convo.id);
    this.props.fetchMessages( convo.id );
    if (!chatBox.open) { this.props.openChatBox(); }
  }

  onlineList() {
    let { mentorList } = this.props;
    return mentorList.filter(mentor => mentor.availability).map(mentor => mentor.username);
  }

  loadConversations() {
    let { chat, auth } = this.props;
    let onlineList = this.onlineList();
    if(chat) {
      return chat.conversations.map((convo, i) => {
        var notify = false;
        var online = false;
        let conversationWith = convo.name.replace(auth.currentUser.username, '');
          if (_.contains(chat.notifications, convo.id)) { notify = true; }
          if (_.contains(onlineList, conversationWith)) { online = true; }
          return (<MenuItem
                    eventKey={i}
                    key={i}
                    onClick={ () => this.loadChatMessages(convo) } >
                    <div>
                      { conversationWith }
                      { notify ? <i className="fa fa-comment-o" /> : '' }
                    </div>
                    <div className="online-status">
                      { online ? <i className="fa fa-circle" /> : '' }
                    </div>
                  </MenuItem>);
      }, this);
    }
  }

  renderNavLinks() {
    const { auth, signoutUser, chat } = this.props;
    if (auth.authenticated && auth.currentUser) {
      /* This is navbar for logged in LEARNER */
      if (auth.currentUser.secondary_role == "2") {
        return (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item" >
              <DropdownButton
                eventKey="4"
                title={ chat.notifications.length ? <i className="fa fa-comments-o" /> : <i className="fa fa-comments-o none" /> }
                noCaret id="dropdown-no-caret">
                  <MenuItem>
                    Conversations ({chat.conversations.length})
                  </MenuItem>
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
              <a href="#" className="nav-link" onClick={() => signoutUser(auth.currentUser.id)}>
                Log Out
              </a>
            </li>
          </ul>
        );
      }
      /* This is navbar for logged in MENTOR */
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
              <Link to={`/mentor/${auth.currentUser.username}`} className="nav-link">
                <i className="fa fa-user" />
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => signoutUser(auth.currentUser.id)}>
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
    mentorList: state.learner.modifiedMentors,
    auth: state.auth,
    chat: state.chat,
    chatBox: state.chatBox
  };
}

export default connect(mapStateToProps, { signoutUser, fetchConversations, currentConversation, openChatBox, removeNotification, fetchMessages, clearMessages, markAsRead })(Navbar);
