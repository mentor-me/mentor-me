import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TimeAgo from 'react-timeago';
import VideoLink from './VideoLink';

export default class Message extends Component {

  handleClick(msg) {
    if ( msg.indexOf('Click here to join video chat') !== -1 ) {
      let parts = msg.split('/');
      browserHistory.push(`/${parts[3]}/${parts[4]}/videochat/${parts[6]}`);
    }
  }

  render() {

    // Default message time stamp if no message history
    // This time stamp will hide TimeAgo
    let nullTime = '1988-08-12T23:03:54.355Z';

    let TimeAgoStyles = {
      'fontSize': '0.65em',
      'color': 'lightgray',
      'display': 'block',
    }

    let { msg, userId } = this.props;
    let modifiedMessage = 'Click here to join video chat.';

      var text;
      if (msg.content && msg.content.includes('Click here to join video chat')) {
        text = <VideoLink />;
      } else {
        text = msg.content;
      }

      // -1 is the default userId if no message history exists
      // Allows for default message to be on left side
      if(msg.userId == userId || msg.userId == -1){
        return (
          <div onClick={ () => this.handleClick(msg.content) } className="left">
            <div>
              <div className="msg">
                { text }
              </div>
              { msg.createdAt != nullTime ? <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } /> : '' }
            </div>
          </div>
        );
      } else {
        return (
          <div onClick={ () => this.handleClick(msg.content) } className="right">
            <div>
              <div className="msg">
                { text }
              </div>
              { msg.createdAt != nullTime ? <TimeAgo style={ TimeAgoStyles } date={ msg.createdAt } /> : '' }
            </div>
          </div>
        );
      }
    }
  }
