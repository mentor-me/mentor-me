import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER
} from './actionTypes';

 export function loginUser(loginProps) {
   const { role } = loginProps;
   return dispatch => {
     // TODO: WIRE UP!
     axios.post('/api/login', loginProps) //add back login props for a post
       .then(response => {
         localStorage.setItem('token', response.headers.auth);
         localStorage.setItem('currentUser', response.data.currentUser);
         dispatch({
           type: AUTH_USER,
           payload: data
         })
         browserHistory.push(`/learner/${data.username}`);
       })
       .catch((err) => {
         // dispatch AUTH_ERROR
         console.log("Login bad", err);
       });
   }
 }

 export function signupUser(loginProps) {

  let data = {
    username: loginProps.username,
    firstname: loginProps.firstname,
    firstname: loginProps.lastname,
    email: loginProps.email,
    password: loginProps.password,
    primary_role: 1,
    preferences: {
      visual: loginProps.learnerStyle == "Visual" ? 'true' : 'false',
      academic: loginProps.learnerStyle == "Academic" ? 'true' : 'false',
      remote: loginProps.meetingFormat == "Remote" ? 'true' : 'false',
      inPerson: loginProps.meetingFormat == "In Person" ? 'true' : 'false'
    }
  }

   return dispatch => {
     axios.post('/api/signup', data)
       .then(response => {
         console.log('sign up resp: ', response)
         dispatch({
           type: AUTH_USER,
           payload: data
         })
         browserHistory.push(`/learner/${data.username}`);
       })
       .catch((err) => {
         // dispatch AUTH_ERROR
         console.log("Sign up bad", err);
       });
   }
 }

 export function signoutUser() {
   //remove token
   return dispatch => {
     dispatch({ type: UNAUTH_USER });
     localStorage.removeItem('token');
     browserHistory.push('/');
   }
 }
