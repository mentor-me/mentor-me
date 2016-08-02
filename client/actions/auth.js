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
     axios.get('/api/learners/users/3') //add back login props for a post
       .then(response => {
         const data = {};
         data.name = 'Max';
         data.username = "meinstein";
         data.role = "Learner";
         data.id = 1;
         dispatch({
           type: AUTH_USER,
           payload: data
         })
         if (data.role === 'Learner'){
           browserHistory.push(`/learner/${data.username}`);
         } else {
           browserHistory.push('/mentor');
         }
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
     axios.post('/api/learner/users', data)
       .then(response => {
         console.log('sign up resp: ', response)
         dispatch({ type: AUTH_USER, payload: data })
         if (data.primary_role === 1){
           browserHistory.push(`/learner/${data.username}`);
         } else {
           browserHistory.push('/mentor');
         }
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
     browserHistory.push('/');
   }
 }
