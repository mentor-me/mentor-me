import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TimeAgo from 'react-timeago';
import Gravatar from 'react-gravatar';

export default class Message extends Component {

  render() {

    let TimeAgoStyles = {
      'fontSize': '0.65em',
      'color': 'lightgray',
      'display': 'block',
    }

    let { msg, userId } = this.props;

    /* Match IDs in order to determine which side to render message inside chatbox */
    if(msg.userId == userId){
      return (
        <div className="left">
          <div>
            <div className="msg"> { msg.content } </div>
            <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } />
          </div>
        </div>
      );
    } else {
      return (
        <div className="right">
          <div>
            <div className="msg"> { msg.content } </div>
            <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } />
          </div>
        </div>
      );
    }
  }
}
