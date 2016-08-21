import axios from 'axios';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { mentorSortPrefs, mentorSearchByTerm } from '../utils/utils';

import {
  ROOT_URL,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  CURRENT_MENTOR_REVIEWS,
  CLEAR_MENTOR_REVIEWS,
  CLEAR_MENTOR,
  SUBMIT_REVIEW,
  CHANGE_PREFS,
  MODIFIED_MENTORS,
  SEARCHABLE_MENTORS,
  LOADING_MENTOR,
  LOADING_MENTOR_COMPLETE,
  LOADING_LEARNER_DASHBOARD,
  LOADING_LEARNER_DASHBOARD_COMPLETE
} from './actionTypes';

export function newSearchQuery(query) {
  return (dispatch, getState) => {
    // console.log('query: ', query)
    let state = getState();
    let searchableMentors = state.learner.searchableMentors;
    let searchableList = mentorSearchByTerm(searchableMentors, query);
    dispatch({
      type: MODIFIED_MENTORS,
      payload: searchableList
    });
  };
}

export function fetchPreferences(uid, zip, radius) {
  const endpoint = `/api/learner/users/${uid}/preferences`;
  return dispatch => {
    dispatch({ type: LOADING_LEARNER_DASHBOARD });
    axios.get(endpoint)
      .then(response => {
        let preferences = _.pick(response.data, 'id', 'academic', 'inPerson', 'visual', 'remote', 'radiusZip', 'radius');
        preferences.radius = preferences.radius;
        preferences.radiusZip = zip;
        fetchModifiedMentors(uid, preferences, dispatch)
        dispatch({
          type: LEARNER_PREFERENCES,
          payload: preferences
        });
      })
      .catch(err => {
        console.log('fetchPreferences Error: ', err);
    });
  };
}

function fetchModifiedMentors(uid, formProps, dispatch) {
  const endpoint = `/api/learner/users/${uid}/mentorsReq`;
  axios.put(endpoint, formProps)
  .then(response => {
    return mentorSortPrefs(formProps, response.data);
  })
  .then(modifiedResp => {
    dispatch({
      type: MODIFIED_MENTORS,
      payload: modifiedResp
    });
    dispatch({
      type: SEARCHABLE_MENTORS,
      payload: modifiedResp
    });
    dispatch({ type: LOADING_LEARNER_DASHBOARD_COMPLETE });
  })
  .catch(err => {
    console.log('putPreferences Error: ', err);
  });
}

export function fetchCurrentMentor(mentorObj) {
  let endpoint = `/api/mentor/users/${mentorObj.id}/reviews`;
  return (dispatch) => {
    dispatch({ type: LOADING_MENTOR });
    dispatch({ type: CLEAR_MENTOR_REVIEWS });
    dispatch({ type: CLEAR_MENTOR });
    axios.get(endpoint)
    .then(response => {
      dispatch({
        type: CURRENT_MENTOR_REVIEWS,
        payload: response.data
      });
      dispatch({
        type: CURRENT_MENTOR,
        payload: mentorObj
      });
      dispatch({ type: LOADING_MENTOR_COMPLETE });
    })
    .catch(err => {
      console.log('fetchCurrentMentor Error: ', err);
    })
  }
}

export function submitReview(data) {
  const endpoint = `/api/learner/users/${data.mentorId}/review`
  return (dispatch) => {
    axios.post(endpoint, data)
    .then(response => {
      dispatch({
        type: SUBMIT_REVIEW,
        payload: data
      });
    })
    .catch(err => {
      console.log('submitReview Error: ', err);
    })
  };
}

export function changePreferences(uid, formProps) {
  const endpoint = `/api/learner/users/${uid}/preferences`
  return (dispatch, getState) => {
    dispatch({
      type: LEARNER_PREFERENCES,
      payload: formProps
    })
    axios.put(endpoint, formProps)
    .then(() => {
      let state = getState();
      let modifiedMentors = state.learner.modifiedMentors;
      return mentorSortPrefs(formProps, modifiedMentors);
    }).then(data => {
      dispatch({
        type: MODIFIED_MENTORS,
        payload: data
      })
    })
    .catch(err => {
      console.log('changePreferences Error: ', err);
    });
  }
}
