import {
  SELECTED_SLOT,
  SELECTED_APPOINTMENT,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  FETCH_APPOINTMENTS,
  UPDATE_APPOINTMENT

} from '../actions/actionTypes';

const INITIAL_STATE = {
  appointments: [], event: {}
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
      case SELECTED_SLOT:
        return {...state, event: action.payload}
      case SELECTED_APPOINTMENT:
        return {...state, event: action.payload}
      case CREATE_APPOINTMENT:
        return { ...state, appointments: [
        ...state.appointments.concat(action.payload)]
      }

      case FETCH_APPOINTMENTS:
        return { ...state, appointments: [
          ...action.payload.map(appt => {
              let obj = appt;
              obj.startTime = new Date(appt.startTime)
              return obj;
            })
        ] };

      case UPDATE_APPOINTMENT:
          return { ...state, appointments: [
                ...state.appointments.map(appt => {
                      if (appt.id === action.payload.id){
                        return action.payload
                      }
                      return appt;
                  }
                )
              ]};

      case DELETE_APPOINTMENT:
        return { ...state, appointments: [
              ...state.appointments.filter(
                appt => {
                  console.log('EACH APPT---', appt)
                  return appt.id !== action.payload
                }

              )
            ]};
      default:
      return state
      }

}
