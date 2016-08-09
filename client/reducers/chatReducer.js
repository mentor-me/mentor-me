import {
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES
} from '../actions/actionTypes';

const INITIAL_STATE = {
  conversations: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case CONVERSATION_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
