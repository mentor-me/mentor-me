import axios from 'axios';

import {
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  CLEAR_MESSAGES,
  SAVE_MESSAGE
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
  /* Save message in state before DB post */
    return dispatch => {
      dispatch({
        type: SAVE_MESSAGE,
        payload: data
      })
      axios.post(endpoint, data)
        .then(response => {
          console.log('message successfully posted to db', response)
        })
        .catch((err) => {
          console.log('fetchConversations Error: ', err);
        })
      }
}

export function clearMessages() {
  return {
    type: CLEAR_MESSAGES
  }
}

export function saveMessage(data) {
  return dispatch => {
    dispatch({
      type: SAVE_MESSAGE,
      payload: data
    })
  }
}
