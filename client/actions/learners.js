import axios from 'axios';
import _  from 'lodash' ;
import { browserHistory } from 'react-router';
import { mentorSortPrefs, mentorSearchByTerm } from '../utils/utils';

import {
  ROOT_URL,
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
  CURRENT_MENTOR_REVIEWS,
  CLEAR_MENTOR_REVIEWS,
  CLEAR_MENTOR,
  SUBMIT_REVIEW,
  CHANGE_PREFS,
  MODIFIED_MENTORS,
  SEACHABLE_MENTORS
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

  return (dispatch, getState) => {

    console.log('query: ', query)
    let state = getState();
    let modifiedMentors = state.learner.modifiedMentors;
    console.log("THIS SI THE MODIFIED " ,modifiedMentors)

    var mentorsList = mentorSearchByTerm(modifiedMentors, query)
    console.log(mentorsList)
        dispatch({
          type: SEACHABLE_MENTORS,
          payload: mentorsList
        });
  };
}






export function fetchPreferences(uid) {
  console.log("fetchPreferences(userId) :: ", uid)
  const endpoint = `/api/learner/users/${uid}/preferences`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        let preferences = _.pick(response.data, 'id', 'academic', 'inPerson', 'visual', 'remote', 'radiusZip', 'radius');
        preferences.radius = preferences.radius || 25;
        return preferences;
      })
      .then( preferences => {
        dispatch({
          type: LEARNER_PREFERENCES,
          payload: preferences,
        });
      })
      .catch((err) => {
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




export function fetchModifiedMentors(formProps) {

  console.log('FORM PROPS ----',formProps);


  const endpoint = `/api/learner/users/${2}/mentorsReq`;
  return (dispatch) => {
    axios.put(endpoint, formProps)
    .then(response => {
      console.log("this is the response ::: ", response.data)
      return mentorSortPrefs(formProps, response.data);
    })
    .then(modifiedResp => {
      console.log("in Modified", modifiedResp)
            dispatch({
              type: MODIFIED_MENTORS,
              payload: modifiedResp
            });
    })
    .catch((err) => {
      console.log('putPreferences Error: ', err);
    });
  }
}

export function changePreferences(uid, formProps) {
  console.log('formProps--', formProps)
  const endpoint = `http://localhost:8080/api/learner/users/${uid}/preferences`
  return (dispatch) => {
    dispatch({
      type: LEARNER_PREFERENCES,
      payload: formProps
    })
    axios.put(endpoint, formProps)
    .then(() => {
      console.log('success')
    })
    .catch((err) => {
      console.log('changePreferences Error: ', err);
    });
  }
}
