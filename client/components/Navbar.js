import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { fetchConversations, currentConversation, openChatBox } from '../actions/chat';
import { signoutUser } from '../actions/auth';


class Navbar extends Component {

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.fetchConversations(user.id);
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
    let { chat } = this.props;

    socket.emit('disconnect chat', chat.currentConversation);
    socket.emit('chat mounted', convo.id);
    this.props.currentConversation( convo.id );
    this.props.openChatBox();

  }

  loadConversations() {
    let { chat, auth } = this.props;
    if(chat) {
      return chat.conversations.map((convo, i) => {
        let conversationWith = convo.name.replace(auth.currentUser.username, '')
        return <MenuItem eventKey={i} onClick={ () => this.loadChatMessages(convo) } >{ conversationWith }</MenuItem>
      })
    }
  }

  renderNavLinks() {
    const { auth, signoutUser } = this.props;
    if (auth.authenticated) {
      /* This is navbar for logged in LEARNER */
      if (auth.currentUser.secondary_role == "2") {
        return (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <DropdownButton eventKey="4" title={ <i className="fa fa-comments-o" /> } noCaret id="dropdown-no-caret">
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
              <DropdownButton eventKey="4" title={ <i className="fa fa-comments-o" /> } noCaret id="dropdown-no-caret">
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
    chat: state.chat
  };
}

export default connect(mapStateToProps, { signoutUser, fetchConversations, currentConversation, openChatBox })(Navbar);
