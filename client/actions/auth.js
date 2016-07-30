import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER
} from './actionTypes';

 export function loginUser(loginProps) {
   let { role } = loginProps;
   return function(dispatch) {
     // TODO: correct endpoint?
     axios.post('/api/users/login', loginProps)
       .then(response => {
         let data = {};
         data.name = 'Max';
         data.role = role;
         dispatch({ type: AUTH_USER, payload: data })
         if (role == 'Learner'){
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
