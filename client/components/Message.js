import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TimeAgo from 'react-timeago';
import Gravatar from 'react-gravatar';

export default class Message extends Component {

  handleClick(msg) {
    if ( msg.indexOf('http') != -1 ){
      let parts = msg.split('/');
      browserHistory.push(`/${parts[3]}/${parts[4]}/videochat/${parts[6]}`);
    }
  }

  render() {

    let TimeAgoStyles = {
      'fontSize': '0.65em',
      'color': 'lightgray',
      'display': 'block',
    }

    let { msg, userId } = this.props;

    if(msg.userId == userId){
      return (
        <div onClick={ () => this.handleClick(msg.content) } className="left">
          <div>
            <div className="msg"> { msg.content } </div>
            <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } />
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={ () => this.handleClick(msg.content) } className="right">
          <div>
            <div className="msg"> { msg.content } </div>
            <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } />
          </div>
        </div>
      );
    }
  }
}
