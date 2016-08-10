import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { signoutUser } from '../actions/auth';


class Navbar extends Component {


  renderNavLinks() {
    const { auth, signoutUser } = this.props;
    if (auth.authenticated) {
      /* This is navbar for logged in LEARNER */
      if (auth.currentUser.primary_role) {
        return (
          <ul className="nav navbar-nav pull-xs-right">
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
              <Link to={`/learner/${auth.currentUser.username}/messages`} className="nav-link">
                <i className="fa fa-comment-o" />
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
              <Link to={`/learner/${auth.currentUser.username}/profile`} className="nav-link">
                <i className="fa fa-cog" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/learner/${auth.currentUser.username}/calendar`} className="nav-link">
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
        <nav className="navbar navbar-default navbar-fixed-top" >
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
  };
}

export default connect(mapStateToProps, { signoutUser })(Navbar);
