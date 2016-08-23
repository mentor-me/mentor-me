import React, { Component } from 'react';

export default class Mentor extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    socket.emit('join global', user.username);
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}
