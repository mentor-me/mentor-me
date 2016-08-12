import axios from 'axios';

import {
  MENTOR_FETCH_REVIEWS
} from './actionTypes';

export function fetchMentorReviews(uid) {
  let endpoint = `/api/mentor/users/${uid}/reviews`;
  return (dispatch) => {
    axios.get(endpoint)
    .then(response => {
      dispatch({
        type:   MENTOR_FETCH_REVIEWS,
        payload: response.data
      })
    })
    .catch((err) => {
      console.log('fetch mentor reviews Error: ', err);
    })
  }
}
