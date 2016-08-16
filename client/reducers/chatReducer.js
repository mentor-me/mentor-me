import _ from 'underscore';

import {
  LOADING_MESSAGES,
  LOADING_MESSAGES_COMPLETE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  SAVE_MESSAGE,
  CLEAR_MESSAGES,
  RECIEVE_SOCKET,
  CURRENT_CONVERSATION,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/actionTypes';

const INITIAL_STATE = {
  conversations: [],
  messages: [ {conversationId: -1} ],
  currentConversation: {id: null, recipient: null },
  user: null,
  loading: false,
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case CONVERSATION_MESSAGES:
      return { ...state, messages: action.payload };
    case SAVE_MESSAGE:
      return { ...state,
        messages: [ ...state.messages, action.payload ]
      };
    case CLEAR_MESSAGES:
      return { ...state, messages: [] };
    case CURRENT_CONVERSATION:
      return { ...state, currentConversation: action.payload };
    case RECIEVE_SOCKET:
      return { ...state, user: action.payload };
    case LOADING_MESSAGES:
      return { ...state, loading: true };
    case LOADING_MESSAGES_COMPLETE:
      return { ...state, loading: false };
    case REMOVE_NOTIFICATION:
      return { ...state, notifications: [
        ...state.notifications.filter( id => { action.payload[0] !== id || action.payload[1] !== id } )
      ]};
    case ADD_NOTIFICATION:
      return { ...state, notifications:
        _.uniq([ ...state.notifications, action.payload ])
      };
    default:
      return state;
  }
};
