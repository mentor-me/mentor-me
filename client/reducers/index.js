import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import learnersReducer from './learnersReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  form,
  learner: learnersReducer

});

export default rootReducer;
