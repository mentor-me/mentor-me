import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';
import currentCalendar from './currentCalendar';
import chatReducer from './chatReducer';
import mentorReducer from './mentorReducer';
import chatBoxReducer from './chatBoxReducer';

const rootReducer = combineReducers({
  appointments: currentCalendar,
  auth: authReducer,
  chat: chatReducer,
  chatBox: chatBoxReducer,
  learner: learnersReducer,
  mentor: mentorReducer,
  form
});

export default rootReducer;
