import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { reduxForm } from 'redux-form';
import { createAppointment, fetchAppointments } from '../actions/calendar';

import Modal from 'react-modal';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(Moment)
);

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255,255,255, .1)',
    zIndex: 900,
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class Calendar extends Component {

  componentWillMount() {
  if(this.props.auth.currentUser.id){
    this.props.fetchAppointments();
    }

  }

  handleFormSubmit(formProps) {
    let userId = this.props.auth.currentUser.id
    let mentorId = this.props.mentor.id

    this.props.createAppointment(formProps, userId, mentorId);
  }

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      date: '',
      startTime: '',
      endTime: '',
      modalIsOpen: false,

    };

    this.open = this.open.bind(this);
  }

  open(slotInfo) {

    this.setState({
      modalIsOpen: true,
      date: Moment(slotInfo.start).format("YYYY-MM-DD"),
      startTime: Moment(slotInfo.start).format("HH:mm"),
      endTime: Moment(slotInfo.end).format("HH:mm")
    });
  }

  close() {
    this.setState({
      modalIsOpen: false,
    });
  }

  appointmentFormat() {

    return this.props.appointments.map((appointment, i) => {

        let obj =   {
            start: new Date(appointment.startTime),
            end: new Date(appointment.endTime),
            title: appointment.notes
          }
          return obj;
    });
  }


  render() {

    const { appointments, auth, mentor, handleSubmit, fields: { date, startTime, endTime, location, notes } } = this.props;


    return (

      <div className="spacer30" style={{ height: 640 }}>

        <BigCalendar
            	selectable
            	events={this.props.appointments ? this.appointmentFormat() : []}
            	onSelectEvent={event => this.open(event)}
            	defaultView="month"
            	scrollToTime={new Date(1970, 1, 1, 6)}
            	defaultDate={new Date(2016, 8, 8)}
            	onSelectSlot={(slotInfo) => this.open({ start: slotInfo.start, end: slotInfo.end,
          }

          )}
        />


          <Modal

        	isOpen={this.state.modalIsOpen}
      	  style={customStyles}
              >


        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <div className="spacer30"> </div>
            <div className="form-group">
              <input type="date" className="form-control" placeholder="Date" {...date} value={this.state.date}/>
            </div>

            <div className="form-group">
              <input type="time" className="form-control" placeholder="Start time" {...startTime} value={this.state.startTime}/>
            </div>

            <div className="form-group">
              <input type="time" className="form-control" placeholder="End time" {...endTime} value={this.state.endTime}/>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Location" {...location} />
            </div>

            <div className="form-group">
              <textarea className="form-control" placeholder="Notes" {...notes} />
            </div>

            <div>
              <button className="btn-global" type="submit">Create Appt</button>
            </div>

          </form>

          <div>
            <button className="btn-global" onClick={this.close.bind(this)}>Cancel</button>
          </div>


        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.learner.appointments,
    auth: state.auth,
    mentor: state.learner.currentMentor

  };
}

export default reduxForm({
  form: 'appointment',
  fields: ['date', 'startTime', 'endTime', 'location', 'notes'],
}, mapStateToProps, { createAppointment, fetchAppointments })(Calendar);
