import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  CURRENT_MENTOR,
  USER_CONVERSATIONS,
  AUTH_ERROR,
  CLOSE_CHAT_BOX,
  ADD_NOTIFICATION,
} from './actionTypes';

export function authError(error) {
  // console.log("I'm in authError")
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

function removeSensitiveUserData(data) {
  delete data.passwordHash;
  delete data.salt;
  delete data.password;
  return data;
}

////////////////////////////////////////////
////////// LEARNER RELATED ACTIONS ////////
//////////////////////////////////////////

 export function loginUser(loginProps) {
   var updatedInfo = { lastLogIn: new Date(), availability: true };
   var obj = {...loginProps, ...updatedInfo};
   return dispatch => {
     axios.put('/api/login', obj)
       .then(response => {
        let data = removeSensitiveUserData(response.data);
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({
          type: AUTH_USER,
          payload: data
        })
         browserHistory.push(`/learner/${response.data.username}`);
         getInitialConversations(response.data.id, dispatch);
       })
       .catch(() => {
         dispatch(authError("The email and Password do not match"));
       });
   }
 }

 export function signupUser(loginProps) {
    //  console.log("this is in signup Learner", loginProps.learnerStyle[0])

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
      visual: loginProps.learnerStyle[0] == "Visual" ? 'true' : 'false',
      academic: loginProps.learnerStyle[1] == "Academic" ? 'true' : 'false',
      remote: loginProps.meetingFormat[0] == "Remote" ? 'true' : 'false',
      inPerson: loginProps.meetingFormat[1] == "In Person" ? 'true' : 'false'
    }
  }
   return dispatch => {
     axios.post('/api/signup', data)
       .then(response => {
         let data = removeSensitiveUserData(response.data);
         localStorage.setItem('token', "response.headers.auth");
         localStorage.setItem('user', JSON.stringify(data));
        //  console.log('sign up resp: ', response)
         dispatch({
           type: AUTH_USER,
           payload: data
         })
         browserHistory.push(`/learner/${data.username}`);
       })
       .catch(() => {
         // dispatch AUTH_ERROR
         dispatch(authError("Email and/or Username currently in Use "));
       });
   }
 }

export function signoutUser(uid) {
   return dispatch => {
     dispatch({ type: UNAUTH_USER });
     dispatch({ type: CLOSE_CHAT_BOX });
     // Manually remove all reduxPersist on logout
     localStorage.removeItem('reduxPersist:appointments');
     localStorage.removeItem('reduxPersist:auth');
     localStorage.removeItem('reduxPersist:chat');
     localStorage.removeItem('reduxPersist:form');
     localStorage.removeItem('reduxPersist:learner');
     localStorage.removeItem('reduxPersist:mentor');
     //Remove all other state
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     // Redirect to home page
     browserHistory.push('/');
     axios.put(`/api/logout/${uid}`)
     .then(response => {
      //  console.log('Successfully signed out user.')
     })
   }
 }

////////////////////////////////////////////
////////// MENTOR RELATED ACTIONS /////////
//////////////////////////////////////////

export function signupMentor(loginProps) {
  // console.log("this is in singup mentor", loginProps.learnerStyle[0])
 let data = {
   username: loginProps.username,
   firstname: loginProps.firstname,
   lastname: loginProps.lastname,
   availability: true,
   email: loginProps.email,
   password: loginProps.password,
   description: loginProps.description,
   skills: loginProps.skills.split(',').map(skill => skill.trim()),
   zip: loginProps.zipCode,
   primary_role: "1",
   lastLogIn: new Date(),
   qualities: {
     visual: loginProps.learnerStyle[0] == "Visual" ? 'true' : 'false',
     academic: loginProps.learnerStyle[1] == "Academic" ? 'true' : 'false',
     remote: loginProps.meetingFormat[0] == "Remote" ? 'true' : 'false',
     inPerson: loginProps.meetingFormat[1] == "In Person" ? 'true' : 'false'
   }
 }
  return dispatch => {
    axios.post('/api/mentor/signup', data)
      .then(response => {
        let data = removeSensitiveUserData(response.data);
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({
          type: AUTH_USER,
          payload: data
        })
        browserHistory.push(`/mentor/${data.username}`);
      })
      .catch( err => {
        dispatch(authError("Email and/or Username currently in Use "));
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
        let data = removeSensitiveUserData(response.data);
        localStorage.setItem('token', "response.headers.auth");
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({
          type: AUTH_USER,
          payload: data
        })
        browserHistory.push(`/mentor/${response.data.username}`);
        getInitialConversations(response.data.id, dispatch);
      })
      .catch(() => {
        // dispatch AUTH_ERROR
        dispatch(authError("The email and Password do not match"));
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
  // console.log("this is the data obj" , data)
  return dispatch => {
    axios.put(`/api/learner/${currentUser.id}/becomeAmentor`, data)
    .then(response => {
      // console.log("This is the response data obj", response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data
      })
      browserHistory.push(`/mentor/${response.data.username}`)
    })
    .catch( err => {
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
      // console.log("This is the response data obj", response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data
      })
      browserHistory.push(`/mentor/${response.data.username}`);
    })
    .catch( err => {
      console.log("You could not become a learner", err);

    });
  }
}

//////// HELPER ///////
function getInitialConversations(uid, dispatch) {
  const endpoint = `/api/conversations/${uid}`;
  axios.get(endpoint)
    .then(response => {
      // console.log('User conversations----', response.data)
      dispatch({
        type: USER_CONVERSATIONS,
        payload: response.data
      });
      let convoIdArr = response.data.map( convo => convo.id );
      return convoIdArr;
    })
    .then( convoIdArr => {
      // console.log('convoIdArr', convoIdArr)
      convosWithUnreadMessages(convoIdArr, dispatch);
    })
    .catch( err => {
      console.log('fetchConversations Error: ', err);
  })
}

function convosWithUnreadMessages(convoIdArr, dispatch) {
  const endpoint = `/api/conversations/unread`;
  axios.put(endpoint, convoIdArr)
    .then(response => {
      // console.log('convosWithUnreadMessages----', response.data)
      dispatch({
        type: ADD_NOTIFICATION,
        payload: response.data
      })
    })
    .catch(err => {
      console.log('convosWithUnreadMessages Error: ', err);
  })
}
