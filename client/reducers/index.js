import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';
import currentCalendar from './currentCalendar'

const rootReducer = combineReducers({
  auth: authReducer,
  form,
  learner: learnersReducer,
  appointments: currentCalendar

});

export default rootReducer;
