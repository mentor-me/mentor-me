import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  CREATE_APPOINTMENT,
  FETCH_APPOINTMENTS,
} from './actionTypes';

export function createAppointment(formProps, mentorId, userId) {
  // const endpoint = `api/learner/users/${userid}/appointment`

  const endpoint = '/api/learner/users/userid/appointment';

  return function (dispatch) {
    axios.post(endpoint, formProps)
      .then(response => {
        dispatch({ type: CREATE_APPOINTMENT });
        browserHistory.push('somewhere');
      })
      .catch(() => {
        // Fix catch
        console.log('in catch err ');
      });
  };
}

export function fetchAppointments() {

  const endpoint = '/api/learner/users/4/appointments';

  return dispatch => {
    axios.get(endpoint)
      .then(response => {

      console.log('response data from appt fetch', response.data);

      let newData = response.data.map((appointment, i) => {

          return
              {
                start: appointment.startTime,
                end: appointment.endTime,
                title: appointment.notes
              }
        });

      console.log('newData', newData);

            dispatch({
              type: FETCH_APPOINTMENTS,
              payload: newData,
            });
      });
  };
}
