import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form,
  learner: learnersReducer

});

export default rootReducer;
