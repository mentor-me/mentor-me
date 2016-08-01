import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  MENTORS
} from './actionTypes';


export function fetchMentors() {
  const endpoint = '/api/learner/mentors';
  return dispatch => {
    axios.get(endpoint)
     .then( response => {
       dispatch({
         type: MENTORS,
         payload: response.data
       });
     })
   }
}

export function newSearchQuery(query) {
  const endpoint = `/api/learner/search?q=${query}`;
  return dispatch => {
    axios.get(endpoint)
     .then( response => {
       dispatch({
         type: MENTORS,
         payload: response.data
       });
     })
   }
}
