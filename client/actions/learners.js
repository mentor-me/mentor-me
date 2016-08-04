import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  ROOT_URL,
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  SUBMIT_REVIEW,
  CURRENT_MENTOR_REVIEWS
} from './actionTypes';

export function fetchMentors() {
  const endpoint = '/api/learner/mentors';
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        dispatch({
          type: MENTORS,
          payload: response.data,
        });
      });
  };
}

export function newSearchQuery(query) {
  console.log('query: ', query)
  const endpoint = `/api/learner/search?q=${query}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        console.log('response: ', response)
        dispatch({
          type: MENTORS,
          payload: response.data,
        });
      });
  };
}

export function fetchPreferences(userId) {
  const endpoint = `ROOT_URL/api/learner/users/${userId}/perferences`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        dispatch({
          type: LEARNER_PREFERENCES,
          payload: response.data,
        });
      });
  };
}

export function fetchCurrentMentor(currentMentor) {
  return (dispatch, getState) => {
    let state = getState();
    let mentorObj = state.learner.mentors.filter(mentor => {
      return currentMentor === mentor.username;
    });
    dispatch({
      type: CURRENT_MENTOR,
      payload: mentorObj,
    });
  };
}


/* TODO: BELOW ACTION CREATOR NOT ACTUALLY DISPATCHING ANYTHING!!! */
export function submitReview(data) {
  const endpoint = `/api/learner/users/${data.mentorId}/review`
  return (dispatch) => {
    axios.post(endpoint, data)
    .then(response => {
      console.log(response)
      dispatch({
        type: SUBMIT_REVIEW,
        payload: data
      });
    })
  };
}

export function fetchCurrentMentorReviews(mentorId) {
  const endpoint = `/api/mentor/users/${mentorId}/reviews`
  return (dispatch) => {
    axios.get(endpoint)
    .then(response => {
      dispatch({
        type: CURRENT_MENTOR_REVIEWS,
        payload: response.data
      });
    })
  };
}
