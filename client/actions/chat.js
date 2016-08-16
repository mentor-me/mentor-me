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
  REMOVE_NOTIFICATION
} from './actionTypes';

export function accessConversation(data, username) {
  const endpoint = `/api/conversations/${data.uid}`;
  return dispatch => {
    axios.post(endpoint, data)
      .then(response => {
        /* If enter here, chat does not yet exist */
        console.log('Instantiating new conversation', response)
        socket.emit('chat mounted', respone.data.id);
      })
      .catch((err) => {
        /* If enter here, chat DOES already exist */
        console.log('Redirect to existing conversation');
        axios.get(endpoint, data)
        .then(response => {
          let existingConvo = response.data.filter((convo) => {
            return convo.name == data.name;
          })
          console.log('this is existing convo: ', existingConvo[0])
          /* Dispatch current conversation to message box updates
          on recieve new props */
          dispatch({
            type: CURRENT_CONVERSATION,
            payload: {id: existingConvo[0].id, recipient: username }
          })
          socket.emit('chat mounted', existingConvo[0].id);
          axios.get(`/api/conversations/${existingConvo[0].id}/messages`)
            .then(response => {
              dispatch({
                type: CONVERSATION_MESSAGES,
                payload: response.data
              });
            })
            .catch((err) => {
              console.log('Failed to fetch messages in ACCESS CONVO: ', err)
            })
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
    // dispatch({
    //   type: LOADING_MESSAGES
    // })
    axios.get(endpoint)
      .then(response => {
        console.log('INSIDE FETCH MESSAGES------', response.data)
        // dispatch({
        //     type: LOADING_MESSAGES_COMPLETE
        // })
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
  console.log('INSIDE POST MESSAGE!')
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
  console.log('ADD NOTIFICATION: ', data)
  return {
    type: ADD_NOTIFICATION,
    payload: data.from
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
