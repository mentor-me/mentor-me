import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TimeAgo from 'react-timeago';
import Gravatar from 'react-gravatar';

export default class Message extends Component {
  render() {

    let style = {
      'fontSize': '0.65em',
      'color': 'lightgray',
      'display': 'block',
      'marginTop': '4px',
      'marginLeft': '4px',
      'marginRight': '2px'
    }

    let GravatarStyles = {
      'width': '40px',
      'height': '40px',
      'borderRadius': '50%',
      'display': 'inline-block'
    }

    let { msg } = this.props;

    /* TODO: Use data from msg to determine pull direction */
    if(msg.id % 2 == 0){
      return (
        <div className="left">
            <Gravatar style={GravatarStyles} email='joe@bob.com' https />
            <div style={{'display': 'inline-block'}}>
              <div className="msg"> { msg.content } </div>
              <TimeAgo style={style} date={ msg.createdAt } />
            </div>
        </div>
      );
    } else {
      return (
        <div className="right">
            <div style={{'display': 'inline-block'}}>
              <div className="msg"> { msg.content } </div>
              <TimeAgo style={style} date={ msg.createdAt } />
            </div>
            <Gravatar style={GravatarStyles} email='joe@bob.com' https />
        </div>
      );
    }
  }
}
