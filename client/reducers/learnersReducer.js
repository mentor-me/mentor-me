import {
  MENTORS
} from '../actions/actionTypes';

const INITIAL_STATE = { mentors: [] }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MENTORS:
      return {...state, mentors: action.payload }
    default:
      return state;
  }
}
