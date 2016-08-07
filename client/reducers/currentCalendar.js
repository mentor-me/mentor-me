import {
  SELECTED_SLOT,
  SELECTED_APPOINTMENT
} from '../actions/actionTypes';


export default function (state = {}, action){
    switch (action.type) {
      case SELECTED_SLOT:
        return {...state, event: action.payload}
      case SELECTED_APPOINTMENT:
        return {...state, event: action.payload}
      default:
      return state
      }

}
