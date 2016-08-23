import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  LOADING_MESSAGES,
  LOADING_MESSAGES_COMPLETE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  CLEAR_MESSAGES,
  SAVE_MESSAGE,
  RECIEVE_SOCKET,
  CURRENT_CONVERSATION,
  OPEN_CHAT_BOX,
  CLOSE_CHAT_BOX,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  MARK_AS_READ,
} from './actionTypes';

/* Default message obj for empty chat */
var emptyChat = {
  content: 'This conversation has no message history yet.',
  read: true,
  createdAt: '1988-08-12T23:03:54.355Z',
  userId: -1
}

export function accessConversation(data) {
  const endpoint = `/api/conversations`;
  return dispatch => {
    dispatch({ type: OPEN_CHAT_BOX });
    dispatch({ type: LOADING_MESSAGES });
    axios.post(endpoint, data)
      .then(response => {
        socket.emit('chat mounted', response.data.id);
        dispatch({
          type: CURRENT_CONVERSATION,
          payload: {
            id: response.data.id,
            recipient: data.recipient,
            availability: data.availability
          }
        });
        /* Now get the messages for that conversation */
        axios.get(`/api/conversations/${response.data.id}/messages`)
          .then(response => {
            // console.log('messages from newly initiated conversation', response.data);
            /* If message history, dispatch conversation messages */
              dispatch({ type: LOADING_MESSAGES_COMPLETE });
              dispatch({
                type: CONVERSATION_MESSAGES,
                payload: response.data.length ? response.data : [emptyChat]
              });
          })
          .catch(err => {
            console.log('Failed to fetch messages in ACCESS CONVO: ', err);
          })
        })
        .catch(err => {
          console.log('Failed to access conversation: ', err);
        })
      }
    }

export function fetchConversations(uid) {
  // console.log(uid)
  const endpoint = `/api/conversations/${uid}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        // console.log('----user conversations!!!!!----', response.data)
        dispatch({
          type: USER_CONVERSATIONS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log('fetchConversations Error: ', err);
    })
  };
}

export function fetchMessages(conversationId) {
  const endpoint = `/api/conversations/${conversationId}/messages`;
  return dispatch => {
    dispatch({ type: LOADING_MESSAGES });
    axios.get(endpoint)
      .then(response => {
        // console.log('INSIDE FETCH MESSAGES------', response.data)
        dispatch({ type: LOADING_MESSAGES_COMPLETE });
        dispatch({
          type: CONVERSATION_MESSAGES,
          payload: response.data.length ? response.data : [emptyChat]
        });
      })
      .catch(err => {
        console.log('fetchConversations Error: ', err);
    })
  };
}

export function postMessage(conversationId, data) {
  // console.log('Posting message.')
  const endpoint = `/api/conversations/${conversationId}/messages`;
  return dispatch => {
    axios.post(endpoint, data)
    .then(response => {
      // console.log('message successfully posted to db', response)
    })
    .catch(err => {
      console.log('postMessage Error: ', err);
    });
  }
}

export function markAsRead(conversationId) {
  const endpoint = `/api/conversations/${conversationId}`;
  return dispatch => {
    axios.put(endpoint)
    .then(response => {
      // console.log('all messages in this convo now marked as read');
    })
    .catch(err => {
      console.log('mark msgs as read Error: ', err);
    });
  }
}

export function receiveSocket(socketID) {
  return {
    type: RECIEVE_SOCKET,
    payload: socketID
  }
}

export function currentConversation(convoObj) {
  return {
    type: CURRENT_CONVERSATION,
    payload: convoObj
  }
}

export function openChatBox() {
  return {
    type: OPEN_CHAT_BOX
  }
}

export function closeChatBox() {
  return {
    type: CLOSE_CHAT_BOX
  }
}

export function addNotification(data) {
  return {
    type: ADD_NOTIFICATION,
    payload: Array.isArray(data) ? data : [data]
  }
}

export function removeNotification(data) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: data
  }
}

export function clearMessages(data) {
  return {
    type: CLEAR_MESSAGES
  }
}
