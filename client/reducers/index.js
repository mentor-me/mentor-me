import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';
import currentCalendar from './currentCalendar';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  appointments: currentCalendar,
  auth: authReducer,
  chat: chatReducer,
  form,
  learner: learnersReducer,

});

export default rootReducer;
