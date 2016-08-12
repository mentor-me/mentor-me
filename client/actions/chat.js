import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  LOADING_MESSAGES,
  LOADING_MESSAGES_COMPLETE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  CLEAR_MESSAGES,
  SAVE_MESSAGE,
  RECIEVE_SOCKET
} from './actionTypes';

export function accessConversation(data) {
  const endpoint = `/api/conversations/${data.uid}`;
  return dispatch => {
    axios.post(endpoint, data)
      .then(response => {
        /* If enter here, chat does not yet exist */
        console.log('Instantiating new conversation', response)
        browserHistory.push(`/learner/${data.username}/conversations/${data.mentorId}/${response.data.id}`);
        // dispatch({
        //   type: USER_CONVERSATIONS,
        //   payload: response.data
        // });
      })
      .catch((err) => {
        /* If enter here, chat DOES already exist */
        console.log('Redirect to existing conversation');
        axios.get(endpoint, data).then(response => {
          let existingConvo = response.data.filter((convo) => {
            return convo.name == data.name;
          })
        browserHistory.push(`/learner/${data.username}/conversations/${existingConvo[0].mentorId}/${existingConvo[0].id}`);
      })
    })
  };
}

export function fetchConversations(uid) {
  console.log(uid)
  const endpoint = `/api/conversations/${uid}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        console.log('----user conversations!!!!!----', response.data)
        dispatch({
          type: USER_CONVERSATIONS,
          payload: response.data
        });
      })
      .catch((err) => {
        console.log('fetchConversations Error: ', err);
    })
  };
}

export function fetchMessages(conversationId) {
  const endpoint = `/api/conversations/${conversationId}/messages`;
  return dispatch => {
    dispatch({
      type: LOADING_MESSAGES
    })
    axios.get(endpoint)
      .then(response => {
        dispatch({
            type: LOADING_MESSAGES_COMPLETE
        })
        dispatch({
          type: CONVERSATION_MESSAGES,
          payload: response.data
        });
      })
      .catch((err) => {
        console.log('fetchConversations Error: ', err);
    })
  };
}

export function postMessage(conversationId, data) {
  const endpoint = `/api/conversations/${conversationId}/messages`;
  return dispatch => {
    axios.post(endpoint, data)
    .then(response => {
      console.log('message successfully posted to db', response)
    })
    .catch((err) => {
      console.log('fetchConversations Error: ', err);
    })
  }
}


export function receiveSocket(socketID) {
  return {
    type: RECIEVE_SOCKET,
    payload: socketID
  }
}
