import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = { currentUser: {}, authenticated: false, error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, currentUser: action.payload };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false, currentUser: {} };
      case AUTH_ERROR:
      console.log("this is the action payload in error", action.payload)
        return { ...state, error: action.payload };
    default:
      return state;
  }
}
