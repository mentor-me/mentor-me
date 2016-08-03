import {
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  FETCH_APPOINTMENTS

} from '../actions/actionTypes';

const INITIAL_STATE = { appointments: [],  mentors: [], preferences: {}, currentMentor: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENTORS:
      return { ...state, mentors: action.payload };
    case LEARNER_PREFERENCES:
      return { ...state, preferences: action.payload };
    case CURRENT_MENTOR:
      return { ...state, currentMentor: action.payload[0] };
    case FETCH_APPOINTMENTS:
      return { ...state, appointments: action.payload };
    default:
      return state;
  }
};
