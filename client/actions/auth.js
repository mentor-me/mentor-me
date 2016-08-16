import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  CURRENT_MENTOR,
  USER_CONVERSATIONS
} from './actionTypes';

////////////////////////////////////////////
////////// LEARNER RELATED ACTIONS ////////
//////////////////////////////////////////

 export function loginUser(loginProps) {
   var updatedInfo = { lastLogIn: new Date(), availability: true };
   var obj = {...loginProps, ...updatedInfo};
   console.log("this is the obj ", obj)
   return dispatch => {
     axios.put('/api/login', obj)
       .then(response => {
         //replace line below
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
          type: AUTH_USER,
          payload: response.data
        })
         browserHistory.push(`/learner/${response.data.username}`);
        //  console.log()
        // socket.emit('join global', response.data.username)
         getInitialConversations(response.data.id, dispatch);
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
    lastname: loginProps.lastname,
    availability: true,
    email: loginProps.email,
    password: loginProps.password,
    zip: loginProps.zipCode,
    secondary_role: "2",
    lastLogIn: new Date(),
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
         //replace line below
         localStorage.setItem('token', "response.headers.auth");
         localStorage.setItem('user', JSON.stringify(response.data));
         console.log('sign up resp: ', response)
         dispatch({
           type: AUTH_USER,
           payload: response.data
         })
         browserHistory.push(`/learner/${data.username}`);
        //  socket.emit('join global', response.data.username)
        //  getInitialConversations(response.data.id, dispatch);
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
     localStorage.removeItem('user');
     browserHistory.push('/');
   }
 }

////////////////////////////////////////////
////////// MENTOR RELATED ACTIONS /////////
//////////////////////////////////////////

export function signupMentor(loginProps) {
  console.log("this is in singup mentor")
 let data = {
   username: loginProps.username,
   firstname: loginProps.firstname,
   lastname: loginProps.lastname,
   availability: true,
   email: loginProps.email,
   password: loginProps.password,
   description: loginProps.description,
   skills: loginProps.skills.split(' '),
   zip: loginProps.zipCode,
   primary_role: "1",
   lastLogIn: new Date(),
   qualities: {
     visual: loginProps.learnerStyle == "Visual" ? 'true' : 'false',
     academic: loginProps.learnerStyle == "Academic" ? 'true' : 'false',
     remote: loginProps.meetingFormat == "Remote" ? 'true' : 'false',
     inPerson: loginProps.meetingFormat == "In Person" ? 'true' : 'false'
   }
 }
 console.log("This is data from sign up mentor",data)

  return dispatch => {
    axios.post('/api/mentor/signup', data)
      .then(response => {
        //replace line below
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
          type: AUTH_USER,
          payload: response.data
        })
        browserHistory.push(`/mentor/${data.username}`);
        // socket.emit('join global', response.data.username)
      })
      .catch((err) => {
        // dispatch AUTH_ERROR
        console.log("Mentor sign up bad", err);
      });
  }
}

export function loginMentor(loginProps) {
  var updatedInfo = { lastLogIn: new Date(), availability: true };
  var obj = {...loginProps, ...updatedInfo};
  return dispatch => {
    axios.put('/api/mentor/login', obj)
      .then(response => {
        //replace line below
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data)
       //  localStorage.setItem('token', response.headers.auth);
        dispatch({
          type: AUTH_USER,
          payload: response.data
        })
        browserHistory.push(`/mentor/${response.data.username}`);
        getInitialConversations(response.data.id, dispatch);
        // socket.emit('join global', response.data.username)
      })
      .catch((err) => {
        // dispatch AUTH_ERROR
        console.log("Login bad", err);
      });
  }
}

////////////////////////////////////////////
//////////    UPGRADE PROFILE     /////////
//////////////////////////////////////////

export function updateMentor(formProps, currentUser){
  let data = {
    primary_role: "1",
    description: formProps.description,
    skills: formProps.skills,
    qualities: {
      visual: formProps.teachingStyle = "Visual" ? 'true' : 'false',
      academic: formProps.teachingStyle = "Academic" ? 'true' : 'false',
      remote: formProps.meetingFormat = "Remote" ? 'true' : 'false',
      inPerson: formProps.meetingFormat = "In Person" ? 'true' : 'false'
    }
  }
  console.log("this is the data obj" , data)
  return dispatch => {
    axios.put(`/api/learner/${currentUser.id}/becomeAmentor`, data)
    .then(response => {
      console.log("This is the response data obj", response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data
      })
      browserHistory.push(`/mentor/${response.data.username}`)
    })
    .catch((err) => {
      console.log("You could NOT become a mentor", err);
    });

  }
}

export function updateLearner(formProps, currentUser){
  let data = {
    secondary_role: "2",
    preferences: {
      visual: formProps.learnerStyle == "Visual" ? 'true' : 'false',
      academic: formProps.learnerStyle == "Academic" ? 'true' : 'false',
      remote: formProps.meetingFormat == "Remote" ? 'true' : 'false',
      inPerson: formProps.meetingFormat == "In Person" ? 'true' : 'false'
    }
  }
  return dispatch => {
    axios.put(`/api/mentor/${currentUser.id}/becomeAlearner`, data)
    .then(response => {
      console.log("This is the response data obj", response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data
      })
      browserHistory.push(`/mentor/${response.data.username}`)
    })
    .catch((err) => {
      console.log("You could not become a learner", err);

    });
  }
}

//////// HELPER ///////
function getInitialConversations(uid, dispatch) {
  const endpoint = `/api/conversations/${uid}`;
  axios.get(endpoint)
    .then(response => {
      console.log('----user conversations!!!!!----', response.data)
      dispatch({
        type: USER_CONVERSATIONS,
        payload: response.data
      });
    })
    .catch((err) => {
      console.log('fetchConversations Error: ', err);
  })
}
