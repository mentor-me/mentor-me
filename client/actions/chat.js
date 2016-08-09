import axios from 'axios';

import {
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  POST_MESSAGE
} from './actionTypes';

export function fetchConversations(uid) {
  const endpoint = `/api/conversations/${uid}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        console.log('conversations: ', response)
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
    axios.get(endpoint)
      .then(response => {
        console.log('messages from conversation: ', response)
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
  console.log('messages to post to server: ', data)
  return dispatch => {
    axios.post(endpoint, data)
      .then(response => {
        dispatch({
          type: POST_MESSAGE,
          payload: response.data
        });
      })
      .catch((err) => {
        console.log('fetchConversations Error: ', err);
    })
  };
}
