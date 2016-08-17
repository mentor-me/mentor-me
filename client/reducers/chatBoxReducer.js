import {
  OPEN_CHAT_BOX,
  CLOSE_CHAT_BOX
} from '../actions/actionTypes';

const INITIAL_STATE = { open: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_CHAT_BOX:
      return { open: true };
    case CLOSE_CHAT_BOX:
      return { open: false };
    default:
      return state;
  }
}
