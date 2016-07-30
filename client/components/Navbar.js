import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {


  render() {

    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="container-fluid">
              <a className="navbar-brand" href="#">
                MentorMe
              </a>
              <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link join" href="#about">Become A Mentor</Link>
                </li>
              </ul>
          </div>
        </nav>
      </div>
    )
  }

}

export default Navbar;
