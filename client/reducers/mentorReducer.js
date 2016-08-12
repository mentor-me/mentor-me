import {
  MENTOR_FETCH_REVIEWS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  reviews: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENTOR_FETCH_REVIEWS:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};
