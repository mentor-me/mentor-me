import {
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  FETCH_APPOINTMENTS,
  CURRENT_MENTOR_REVIEWS,
  CLEAR_MENTOR,
  CLEAR_MENTOR_REVIEWS,
  CHANGE_PREFS,
  MODIFIED_MENTORS,
  SEACHABLE_MENTORS
} from '../actions/actionTypes';

const INITIAL_STATE = { mentors: [], preferences: {},
                    currentMentor: {}, currentMentorReviews: [],
                     modifiedMentors : [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENTORS:
      return { ...state, mentors: action.payload };
    case LEARNER_PREFERENCES:
      return { ...state, preferences: action.payload };
    case CURRENT_MENTOR:
      return { ...state, currentMentor: action.payload };
    case CLEAR_MENTOR:
      return { ...state, currentMentor: {} };
    case FETCH_APPOINTMENTS:
      return { ...state, appointments: action.payload };
    case CURRENT_MENTOR_REVIEWS:
      return { ...state, currentMentorReviews: action.payload };
    case CLEAR_MENTOR_REVIEWS:
      return { ...state, currentMentorReviews: [] };
    case CHANGE_PREFS:
      return { ...state };
      // return { ...state, preferences: action.payload };
    case MODIFIED_MENTORS:
      return { ...state, modifiedMentors: action.payload };
    case SEACHABLE_MENTORS:
      return { ...state, modifiedMentors: action.payload };
    default:
      return state;
  }
};
