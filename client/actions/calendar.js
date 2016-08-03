import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  CREATE_APPOINTMENT,
  FETCH_APPOINTMENTS,
} from './actionTypes';

export function createAppointment(formProps, mentorId, userId) {

  const endpoint = `/api/learner/users/${userId}/appointment`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId
  }

  return function (dispatch) {
    axios.post(endpoint, appointment)
      .then(response => {
        dispatch({ type: CREATE_APPOINTMENT });
        // browserHistory.push('somewhere');
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}

export function fetchAppointments(userId) {

  const endpoint = `/api/learner/users/${userId}/appointments`;

  return dispatch => {
    axios.get(endpoint)
      .then(response => {

            dispatch({
              type: FETCH_APPOINTMENTS,
              payload: response.data,

            });
      });
  };
}
