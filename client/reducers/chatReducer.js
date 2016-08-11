import {
  LOADING_MESSAGES,
  LOADING_MESSAGES_COMPLETE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  SAVE_MESSAGE,
  CLEAR_MESSAGES,
  RECIEVE_SOCKET
} from '../actions/actionTypes';

const INITIAL_STATE = {
  conversations: [],
  messages: [],
  user: null,
  loading: false
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
    case RECIEVE_SOCKET:
      return { ...state, user: action.payload };
    case LOADING_MESSAGES:
      return { ...state, loading: true };
    case LOADING_MESSAGES_COMPLETE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
