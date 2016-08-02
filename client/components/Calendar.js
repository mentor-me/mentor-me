import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';
import Moment from 'moment';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { createAppointment, fetchAppointments } from '../actions/calendar'; // temp for structure

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
    this.props.fetchAppointments();
  }

  handleFormSubmit(formProps) {
  // const mentorId = this.props.params.mentorId;
  // const userId  = this.props.params.userId;

    this.props.createAppointment(formProps, userId, mentorId);
  }

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      current: '',
      modalIsOpen: false,
    };

    this.open = this.open.bind(this);
  }

  open(slotInfo) {
    const start = slotInfo.start;
    console.log('inside open slotinfo updated', slotInfo);
    this.setState({
      modalIsOpen: true,
    });
  }

  close() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    const { handleSubmit, fields: { date, startTime, endTime, location, notes } } = this.props;

    return (

      <div style={{ height: 640 }}>

        <BigCalendar
	selectable
	events={events}
	onSelectEvent={event => this.open(event)}
	defaultView="month"
	scrollToTime={new Date(1970, 1, 1, 6)}
	defaultDate={new Date(2015, 3, 12)}
	onSelectSlot={(slotInfo) => this.open({ start: slotInfo.start, end:
              slotInfo.end,
          }

          )}
        />

        <Modal
	isOpen={this.state.modalIsOpen}
	style={customStyles}
        >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <div className="spacer30">            </div>
            <div className="form-group">
              <input type="date" className="form-control" placeholder="Date" {...date} />
            </div>

            <div className="form-group">
              <input type="time" className="form-control" placeholder="Start time" {...startTime} />
            </div>

            <div className="form-group">
              <input type="time" className="form-control" placeholder="End time" {...endTime} />
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

export default reduxForm({
  form: 'appointment',
  fields: ['date', 'startTime', 'endTime', 'location', 'notes'],
}, null, { createAppointment, fetchAppointments })(Calendar);
