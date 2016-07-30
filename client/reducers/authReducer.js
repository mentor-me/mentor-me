import {
  AUTH_USER
} from './actionTypes';

const INITIAL_STATE = { currentUser: null, authenticated: null, error:'' };

export default function(state = INITIAL_STATE , action) {
  switch(action.type){
    case AUTH_USER:
      return { ...state, error: '', authenticated: true , currentUser: action.payload };
    default:
      return state;
    }
}
