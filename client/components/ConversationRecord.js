import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';


export default class ConversationRecord extends Component {
  render() {

    let { convo, currentUser, link } = this.props;

    return (
      <tr onClick={ () => browserHistory.push(link)}>
        <td> <i style={{'marginRight':'3px'}} className="fa fa-user" /> { convo.name } </td>
        <td> { moment( convo.updatedAt ).format('[Started on] M/D/YY [at] h:mm a') } </td>
        <td> <i className="fa fa-comment-o" /> </td>
      </tr>
    );
  }
}
