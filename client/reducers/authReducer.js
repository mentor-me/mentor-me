import {
  AUTH_USER,
  UNAUTH_USER
} from '../actions/actionTypes';

const INITIAL_STATE = { currentUser: {}, authenticated: false, error: null };

export default function(state = INITIAL_STATE , action) {
  switch(action.type){
    case AUTH_USER:
      return { ...state, error: null, authenticated: true , currentUser: action.payload };
    case UNAUTH_USER:
      return { ...state, error: null, authenticated: false, currentUser: {} };
    default:
      return state;
    }
}
