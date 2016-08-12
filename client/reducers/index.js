import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';
import currentCalendar from './currentCalendar';
import chatReducer from './chatReducer';
import mentorReducer from './mentorReducer';

const rootReducer = combineReducers({
  appointments: currentCalendar,
  auth: authReducer,
  chat: chatReducer,
  learner: learnersReducer,
  mentor: mentorReducer,
  form
});

export default rootReducer;
