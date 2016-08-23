import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import * as actions from '../../actions/calendar';
import Modal from 'react-modal';
import Popup from './Popup.js';
import AppointmentEdit from './AppointmentEdit.js';
import {connect} from 'react-redux';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(Moment)
);

export default class Calendar extends Component {
  constructor(props) {
    super(props);

      this.state = {
        events: [],
        modalIsOpen: false,
        editModalIsOpen: false
      };
  }

componentWillReceiveProps(nextProps){
  console.log('nextProps', nextProps)
}


  componentWillMount() {

    const { auth } = this.props;

    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.id
    console.log(userId, "user id calendar")

    if (auth.authenticated && auth.currentUser) {
      if (auth.currentUser.secondary_role === "2") {
            console.log( "*******auth.currentUser.secondary_role = 2")
        this.props.fetchAppointments(userId);

    }  else if (auth.currentUser.primary_role === "1"){
            console.log( "*******auth.currentUser.primary_role = 1")
        this.props.fetchMentorAppointments(userId);
        }
    }
  }

  openEdit(event) {

    console.log("openEdit console log event = ", event);

    this.props.selectedAppointment(event)

    this.setState({
      modalIsOpen: false,
      editModalIsOpen: !this.state.editModalIsOpen

    });
  }

  open(slotInfo) {


   console.log( "inside open ")
    const { auth } = this.props;

    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.id

    if (auth.authenticated && auth.currentUser) {
      if (auth.currentUser.secondary_role === "2") {


    this.props.selectedSlot(slotInfo)

    this.setState({
      editModalIsOpen: false,
      modalIsOpen: true
    });

      }
    }

  }

  close() {
     this.setState({
      modalIsOpen: false,
      editModalIsOpen: false,
    })
  }

  appointmentFormat() {

    return this.props.appointments.map((appointment, i) => {

    console.log("this.props.appointments.map", appointment);

        let obj =   {
            key: i,
            isSelected: false,
            start: new Date(appointment.startTime),
            end: new Date(appointment.endTime),
            title: appointment.subject,
            id: appointment.id,
            location: appointment.location,
            notes: appointment.notes
          }
          return obj;
    });

  }

  eventStyleGetter (event) {

    console.log("isSelected console log", isSelected);

    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: '#5f5f5f',
        borderRadius: '0px',
        opacity: 1,
        color: 'white',
        width: '100%',
        border: '0px',
        display: 'block'
    };

    return {
        style: style
    };
  }

  render() {

    return (

      <div className="spacer30" style={{ height: 640 }}>

        <BigCalendar
            	selectable
            	events={this.props.appointments ? this.appointmentFormat() : []}
            	onSelectEvent={event =>
                this.openEdit(event)
              }
            	defaultView="month"
            	scrollToTime={new Date(1970, 1, 1, 6)}
            	defaultDate={new Date(2016, 8, 8)}
            	onSelectSlot={(slotInfo) => this.open({ start: slotInfo.start, end: slotInfo.end,
          }

          )}
        />

      <AppointmentEdit
              isOpen={this.state.editModalIsOpen}
              close={this.close.bind(this)}


                  />
      <Popup
            isOpen={this.state.modalIsOpen}
            close={this.close.bind(this)}

                  />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.appointments.appointments,
    appt: state.appointments.event,
    auth: state.auth,
    mentor: state.learner.currentMentor,
  };
}


export default connect (mapStateToProps, actions)(Calendar);
