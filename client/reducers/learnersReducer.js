import {
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR
} from '../actions/actionTypes';

const INITIAL_STATE = { mentors: [], preferences: {}, currentMentor: {} }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MENTORS:
      return {...state, mentors: action.payload }
    case LEARNER_PREFERENCES:
      return {...state, preferences: action.payload }
    case CURRENT_MENTOR:
      return {...state, currentMentor: action.payload[0] }
    default:
      return state;
  }
}
