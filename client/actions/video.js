import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  GET_VIDEO_TOKEN

} from './actionTypes';

export function getToken(username) {

const endpoint = `/api/token/${username}`

      return function (dispatch) {
        axios.post(endpoint)
          .then(response => {

            identity = data.identity;
            let accessManager = new Twilio.AccessManager(data.token);

            // Check the browser console to see your generated identity.
            // Send an invite to yourself if you want!
            console.log(identity);

            // Create a Conversations Client and connect to Twilio
            conversationsClient = new Twilio.Conversations.Client(accessManager);
            conversationsClient.listen().then(clientConnected, function (error) {
                console.log('Could not connect to Twilio: ' + error.message);

            dispatch({ type: GET_VIDEO_TOKEN });

          }).catch((err) => {
            console.log('createAppointment: ', err);
        });
      };
      }
