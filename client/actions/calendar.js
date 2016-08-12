import axios from 'axios';
import { browserHistory } from 'react-router';
import Moment from 'moment';

import {
  CREATE_APPOINTMENT,
  FETCH_APPOINTMENTS,
  SELECTED_APPOINTMENT,
  SELECTED_SLOT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT

} from './actionTypes';

export function selectedSlot(event){

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

export function selectedAppointment(event){

  var appointmentFormatted = {
    title: event.title,
    date: Moment(event.start).format("YYYY-MM-DD"),
    startTime: Moment(event.start).format("HH:mm"),
    endTime: Moment(event.end).format("HH:mm"),
    id: event.id,
    location: event.location,
    notes: event.notes
  }
    return {
      type: SELECTED_APPOINTMENT,
      payload: appointmentFormatted
    }
}


export function deleteAppointment(userId, mentorId, appId) {
     console.log("inside delete action")
  // const endpoint = `/api/learner/users/${userId}/appointment/${appId}`;
  const endpoint = `/api/learner/users/22/appointment/${appId}`;

  return function (dispatch) {

    axios.delete(endpoint)
      .then(response => {
        dispatch({ type: DELETE_APPOINTMENT });
         console.log("appointment deleted!")
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}

export function updateAppointment(formProps, userId, mentorId, appId) {

  // const endpoint = `/api/learner/users/${userId}/appointment/${appId}`;
  const endpoint = `/api/learner/users/22/appointment/${appId}`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId,
      subject        : formProps.title,
  }

  return function (dispatch) {

    axios.put(endpoint, appointment)
      .then(response => {
        dispatch({ type: UPDATE_APPOINTMENT });
         console.log("appointment updated!")
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}


export function createAppointment(formProps, mentorId, userId) {

  // browserHistory.push(`/learner/${learnerUsername}/mentor/${mentorUsername}/profile`);

  const endpoint = `/api/learner/users/${userId}/appointment`;

  console.log("formProps.title", formProps.title)

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId,
      subject        : formProps.title,
  }


  // console.log('inside action post appt', appointment)

  return function (dispatch) {

    axios.post(endpoint, appointment)
      .then(response => {
        dispatch({ type: CREATE_APPOINTMENT });
         console.log("appointment created!")
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}

export function fetchAppointments(userId) {

console.log("inside appointment fetch", userId)

  // const endpoint = `/api/learner/users/${userId}/appointments`;
  const endpoint = `/api/learner/users/22/appointments`;


  return dispatch => {
    axios.get(endpoint)
      .then(response => {
          console.log("appointments fetched!", response.data)
            dispatch({
              type: FETCH_APPOINTMENTS,
              payload: response.data,

            });
      });
  };
}
