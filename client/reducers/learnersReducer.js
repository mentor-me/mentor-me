import {
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  CURRENT_MENTOR_REVIEWS,
  CLEAR_MENTOR,
  CLEAR_MENTOR_REVIEWS,
  MODIFIED_MENTORS,
  SEARCHABLE_MENTORS,
  LOADING_MENTOR_COMPLETE,
  LOADING_MENTOR,
  LOADING_LEARNER_DASHBOARD,
  LOADING_LEARNER_DASHBOARD_COMPLETE
} from '../actions/actionTypes';

const INITIAL_STATE = {
  preferences: {},
  currentMentor: { id: null },
  currentMentorReviews: [],
  modifiedMentors : [],
  searchableMentors: [],
  loadingMentor: null,
  loadingDashboard: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LEARNER_PREFERENCES:
      return { ...state, preferences: action.payload };
    case CURRENT_MENTOR:
      return { ...state, currentMentor: action.payload };
    case CLEAR_MENTOR:
      return { ...state, currentMentor: {} };
    case CURRENT_MENTOR_REVIEWS:
      return { ...state, currentMentorReviews: action.payload };
    case CLEAR_MENTOR_REVIEWS:
      return { ...state, currentMentorReviews: [] };
    case MODIFIED_MENTORS:
      return { ...state, modifiedMentors: action.payload };
    case SEARCHABLE_MENTORS:
      return { ...state, searchableMentors: action.payload };
    case LOADING_MENTOR:
      return { ...state, loadingMentor: true };
    case LOADING_MENTOR_COMPLETE:
      return { ...state, loadingMentor: false };
    case LOADING_LEARNER_DASHBOARD:
      return { ...state, loadingDashboard: true };
    case LOADING_LEARNER_DASHBOARD_COMPLETE:
      return { ...state, loadingDashboard: false };
    default:
      return state;
  }
};
