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
  console.log("inside delete action", appId)

  const endpoint = `/api/learner/users/${userId}/appointment/${appId}`;

  return function (dispatch) {

        dispatch({
          type: DELETE_APPOINTMENT,
          payload: appId
       });

    axios.delete(endpoint)
      .then(response => {
         console.log("appointment deleted!")
      })
      .catch(() => {

         console.log('in catch err ');
      });
  };
}

export function deleteMentorAppointment(userId, appId) {
  console.log("inside mentor delete action", appId)

  const endpoint = `/api/mentor/users/${userId}/appointment/${appId}`;

  return function (dispatch) {

        dispatch({
          type: DELETE_APPOINTMENT,
          payload: appId
       });

    axios.delete(endpoint)
      .then(response => {
         console.log("appointment deleted!")
      })
      .catch(() => {

         console.log('in catch err ');
      });
  };
}


export function updateAppointment(formProps, userId, mentorId, appId) {

  const endpoint = `/api/learner/users/${userId}/appointment/${appId}`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId,
      subject        : formProps.title,
      appId          : appId
  }


  let appointmentForUpdate = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId,
      subject        : formProps.title,
      id             : appId,
      learnerId      : userId
  }
  return function (dispatch) {


    dispatch({
      type: DELETE_APPOINTMENT,
      payload: appId
   });

   dispatch({
     type: CREATE_APPOINTMENT,
     payload: Array.isArray(appointmentForUpdate) ? appointmentForUpdate : [appointmentForUpdate]
   });
      // dispatch({
      //   type: UPDATE_APPOINTMENT,
      //   payload: appointment
      //
      //  });
    axios.put(endpoint, appointment)
      .then(response => {

         console.log("appointment updated!")
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}

export function updateMentorAppointment(formProps, userId, appId) {

  console.log("inside mentor update action", appId)

  const endpoint = `/api/mentor/users/${userId}/appointment/${appId}`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
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


export function createAppointment(formProps, userId, mentorId) {

  const endpoint = `/api/learner/users/${userId}/appointment`;

  let appointment = {
      notes          : formProps.notes,
      startTime      : formProps.date + " " + formProps.startTime,
      endTime        : formProps.date + " " + formProps.endTime,
      location       : formProps.location,
      mentorId       : mentorId,
      subject        : formProps.title,
  }

  return function (dispatch) {

    axios.post(endpoint, appointment)
      .then(response => {
        let data = response.data
        console.log("CREATE APPT response.data", response.data)

        dispatch({
          type: CREATE_APPOINTMENT,
          payload: Array.isArray(data) ? data : [data]
        });

         console.log("appointment created!")
      })
      .catch(() => {

        console.log('in catch err ');
      });
  };
}

export function fetchMentorAppointments(userId) {

console.log("inside mentor appointment fetch", userId)

  const endpoint = `/api/mentor/users/${userId}/appointments`;

  return dispatch => {
    axios.get(endpoint)
      .then(response => {
          console.log("appointments fetched!", response.data)
            dispatch({
              type: FETCH_APPOINTMENTS,
              payload: response.data

            });
      });
  };
}


export function fetchAppointments(userId) {

console.log("inside LEARNER appointment fetch", userId)

  const endpoint = `/api/learner/users/${userId}/appointments`;

  return dispatch => {
    axios.get(endpoint)
      .then(response => {
          console.log("appointments fetched!", response.data)
            dispatch({
              type: FETCH_APPOINTMENTS,
              payload: response.data

            });
      });
  };
}
