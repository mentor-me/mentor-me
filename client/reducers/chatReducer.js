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
  OPEN_CHAT_BOX,
  CLOSE_CHAT_BOX,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/actionTypes';

const INITIAL_STATE = {
  conversations: [],
  messages: [],
  currentConversation: {id: null, recipient: null },
  user: null,
  loading: false,
  open: false,
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
      return state;
    case CURRENT_CONVERSATION:
      return { ...state, currentConversation: action.payload };;
    case RECIEVE_SOCKET:
      return { ...state, user: action.payload };
    case LOADING_MESSAGES:
      return { ...state, loading: true };
    case LOADING_MESSAGES_COMPLETE:
      return { ...state, loading: false };
    case OPEN_CHAT_BOX:
      return { ...state, open: true };
    case CLOSE_CHAT_BOX:
      return { ...state, open: false };
    // case REMOVE_NOTIFICATION:
    //   return { ...state, notifications: [
    //
    // ] };
    case ADD_NOTIFICATION:
      console.log(action.payload)
      return { ...state, notifications:
        _.uniq([ ...state.notifications, action.payload ], (item, key, a) => item.a )
      };
    default:
      return state;
  }
};
