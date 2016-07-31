import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER
} from './actionTypes';

 export function loginUser(loginProps) {
   const { role } = loginProps;
   return function(dispatch) {
     // TODO: WIRE UP!
     axios.post('/api/users/login', loginProps)
       .then(response => {
         const data = {};
         data.name = 'Max';
         data.role = role;
         dispatch({ type: AUTH_USER, payload: data })
         if (role === 'Learner'){
           browserHistory.push('/learner');
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
   return function(dispatch) {
     axios.post('/api/users/signup', loginProps)
       .then(response => {
         const data = {};
         data.name = 'Max';
         data.role = 'Learner';
         dispatch({ type: AUTH_USER, payload: data })
         if (data.role === 'Learner'){
           browserHistory.push('/learner');
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
   dispatch({ type: UNAUTH_USER });
   browserHistory.push('/');
 }
