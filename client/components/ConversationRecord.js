import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';


export default class ConversationRecord extends Component {
  render() {

    let { convo, currentUser } = this.props;
    console.log(convo)
    return (
      <tr onClick={ () => browserHistory.push(`/learner/${currentUser.username}/conversations/${currentUser.id}/${convo.id}`) }>
        <td> <i style={{'marginRight':'3px'}} className="fa fa-user" /> { convo.name } </td>
        <td> { moment( convo.updatedAt ).format('[Last contacted] M/D/YY [at] h:mm a') } </td>
        <td> <i className="fa fa-pencil" /> </td>
      </tr>
    );
  }
}
