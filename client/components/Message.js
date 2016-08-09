import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TimeAgo from 'react-timeago';

export default class Message extends Component {
  render() {

    let style = {
      'fontSize': '0.65em',
      'color': 'lightgray',
      'display': 'block',
      'marginTop': '1px',
      'marginLeft': '2px',
      'marginRight': '2px'
    }

    let { msg } = this.props;
    /* TODO: Use data from msg to determine pull direction */
    let pullDirection = msg.id % 2 == 0 ? 'left' : 'right';

    return (
      <div className={ pullDirection }>
        <div className="msg"> { msg.content } </div>
        <TimeAgo style={style} date={ msg.createdAt } />
      </div>
    );
  }
}
