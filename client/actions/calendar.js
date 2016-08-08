import axios from 'axios';
import { browserHistory } from 'react-router';
import Moment from 'moment';

import {
  CREATE_APPOINTMENT,
  FETCH_APPOINTMENTS,
  SELECTED_APPOINTMENT,
  SELECTED_SLOT

} from './actionTypes';

export function selctedSlot(event){

  var appointmentFormatted = {
    date: Moment(event.start).format("YYYY-MM-DD"),
    startTime: Moment(event.start).format("HH:mm"),
    endTime: Moment(event.end).format("HH:mm")
  }
    return {
      type: SELECTED_SLOT,
      payload: appointmentFormatted
    }
}

export function selctedAppointment(event){

  var appointmentFormatted = {
    title: event.title,
    startTime: Moment(event.start).format("HH:mm"),
    endTime: Moment(event.end).format("HH:mm")
  }
    return {
      type: SELECTED_APPOINTMENT,
      payload: appointmentFormatted
    }
}

export function createAppointment(formProps, mentorId, userId) {

  const endpoint = `/api/learner/users/${userId}/appointment`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId
  }

  console.log('inside action post appt', appointment)

  return function (dispatch) {
    //making appt true
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
