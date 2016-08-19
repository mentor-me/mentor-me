import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../actions/actionTypes';

const INITIAL_STATE = { currentUser: {}, authenticated: false, error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, currentUser: action.payload };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false, currentUser: {} };
      case AUTH_ERROR:
        return { ...state, error: action.payload };
    default:
      return state;
  }
}
