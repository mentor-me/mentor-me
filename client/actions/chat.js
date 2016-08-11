import axios from 'axios';

import {
  LOADING_MESSAGES,
  LOADING_MESSAGES_COMPLETE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  CLEAR_MESSAGES,
  SAVE_MESSAGE,
  RECIEVE_SOCKET
} from './actionTypes';

export function fetchConversations(uid) {
  const endpoint = `/api/conversations/${uid}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        console.log('conversations: ', response)
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

export function receiveSocket(socketID) {
  return {
    type: RECIEVE_SOCKET,
    payload: socketID
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
