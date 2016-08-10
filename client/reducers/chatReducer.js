import {
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  SAVE_MESSAGE,
  CLEAR_MESSAGES
} from '../actions/actionTypes';

const INITIAL_STATE = {
  conversations: [],
  messages: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case CONVERSATION_MESSAGES:
      return { ...state, messages: action.payload };
    case SAVE_MESSAGE:
      return { ...state, messages: state.messages.concat(action.payload) };
    case CLEAR_MESSAGES:
      return { ...state, messages: [] };
    default:
      return state;
  }
};
