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
         data.username = "meinstein"
         data.role = role;
         dispatch({
           type: AUTH_USER,
           payload: data
         })
         if (role === 'Learner'){
           browserHistory.push(`/learner/${data.username}`);
         } else {
           browserHistory.push('/mentor');
         }
       })
       .catch(() => {
         // dispatch AUTH_ERROR
         console.log("Login bad");
       });
   }
 }

 export function signupUser(loginProps) {
   return dispatch => {
     axios.post('/api/users/signup', loginProps)
       .then(response => {
         const data = {};
         data.name = 'Max';
         data.username = "meinstein"
         data.role = 'Learner';
         dispatch({ type: AUTH_USER, payload: data })
         if (data.role === 'Learner'){
           browserHistory.push(`/learner/${data.username}`);
         } else {
           browserHistory.push('/mentor');
         }
       })
       .catch(() => {
         // dispatch AUTH_ERROR
         console.log("Sign up bad");
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
