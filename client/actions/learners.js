import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  ROOT_URL,
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  CURRENT_MENTOR_REVIEWS,
  CLEAR_MENTOR_REVIEWS,
  CLEAR_MENTOR,
  SUBMIT_REVIEW,
  CHANGE_PREFS
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
      }).catch((err) => {
        console.log('fetchMentors: ', err);
    })
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
      }).catch((err) => {
        console.log('newSearchQuery: ', err);
    })
  };
}

export function fetchPreferences(userId) {
  const endpoint = `/api/learner/users/${userId}/preferences`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        dispatch({
          type: LEARNER_PREFERENCES,
          payload: response.data,
        });
      }).catch((err) => {
        console.log('fetchPreferences: ', err);
    })
  };
}

export function fetchCurrentMentor(mentorObj) {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MENTOR_REVIEWS
    });
    dispatch({
      type: CLEAR_MENTOR
    });
    let endpoint = `/api/mentor/users/${mentorObj.id}/reviews`;
    axios.get(endpoint)
    .then(response => {
      dispatch({
          type: CURRENT_MENTOR_REVIEWS,
          payload: response.data
        })
      dispatch({
          type: CURRENT_MENTOR,
          payload: mentorObj
        })
    }).catch((err) => {
      console.log('fetchCurrentMentor: ', err);
    })
  }
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
    }).catch((err) => {
      console.log('submitReview: ', err);
    })
  };
}

export function putPreferences(formProps) {
  const endpoint = `/api/learner/users/${1}/preferences`
  return (dispatch) => {
    axios.put(endpoint, formProps)
    .then(response => {
      console.log(response)
      dispatch({
        type: 'yo',
        payload: response
      });
    }).catch((err) => {
      console.log('putPreferences Error: ', err);
    });
  }
}

export function changePreferences() {
  return (dispatch, getState) => {
    /* Grab current Pref state and compare with form state */
    let state = getState();
    let oldPrefs = state.preferences;
    let newPrefs = state.form.preferences;
    /* Do a little dig */
    console.log(state)
    dispatch({
      type: CHANGE_PREFS,
      payload: 'yo'
    });
  }
}
