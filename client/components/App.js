import React, { Component } from 'react';
import Navbar from './universal/Navbar';
import ChatBox from './universal/ChatBox';

export default class App extends Component {
  render() {
    return (
      <div className="root-div">
        <Navbar />
        <div className="container" style={{"marginTop": "85px"}} >
          {this.props.children}
        </div>
        <ChatBox />
      </div>
    );
  }
}
