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
      'marginTop': '2px',
      'marginLeft': '6px',
      'marginRight': '6px'
    }

    let GravatarStyles = {
      'width': '40px',
      'height': '40px',
      'borderRadius': '50%',
      'display': 'inline-block'
    }

    let { msg, userId } = this.props;

    /* TODO: Pull in actual emails for Gravatars!!!! */
    /* Match IDs in order to determine which side to render message inside chatbox */
    if(msg.userId == userId){
      return (
        <div className="left">
            <div style={ { 'marginRight': '6px' } } >
              <Gravatar style={GravatarStyles} email='joe@bob.com' https />
            </div>
            <div>
              <div className="msg"> { msg.content } </div>
              <TimeAgo style={TimeAgoStyles} date={ msg.createdAt } />
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
            <div style={ { 'marginLeft': '6px'} }>
              <Gravatar style={GravatarStyles} email='joe@bob.com' https />
            </div>
        </div>
      );
    }
  }
}
