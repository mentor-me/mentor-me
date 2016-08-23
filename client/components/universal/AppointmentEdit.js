import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import Modal from 'react-modal';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/calendar';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255,255,255, .1)',
    zIndex: 900,
  },

  content: {
    minWidth: '400',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class AppointmentEdit extends Component {
  constructor(props){
    super(props);

    this.state = {
      editModalIsOpen: this.props.isOpen,
      event: this.props.event

    };
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      event: nextProps.event,
      editModalIsOpen: nextProps.isOpen,
    });
  }


  handleDelete (e){
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.id
    // let userId = this.props.auth.currentUser.id
    let mentorId = this.props.mentor.id
    let appId = this.props.appt.id
    this.props.deleteAppointment(userId, mentorId, appId);
    this.props.close()

  }

  handleFormSubmit(formProps) {

    console.log('formProps create appt', formProps)
    let userId = JSON.parse(localStorage.getItem('user'));
    // let userId = this.props.auth.currentUser.id
    let mentorId = this.props.mentor.id
    let appId = this.props.appt.id

    // console.log('inside handle form submit appId = ', appId)
    this.props.updateAppointment(formProps, userId, mentorId, appId);
    this.props.close()

  }

render(){


  const { appointments, auth, mentor, handleSubmit, fields: { date, startTime, endTime, location, notes, title } } = this.props;

return (

  <Modal
    isOpen={this.state.editModalIsOpen}
    style={customStyles}>

    <div className="modal-header">

      <i className="fa fa-remove fa-2x" aria-hidden="true" onClick={this.props.close}></i>
    </div>

    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

    <div className="spacer30"> </div>

      <div className="form-group">
        <input type="text" className="form-control" placeholder="Subject" {...title} />
      </div>

      <div className="form-group">
        <input type="date" className="form-control" placeholder="Date" {...date} />
      </div>

      <div className="form-group">
        <input type="time" className="form-control" placeholder="Start time" {...startTime}/>
      </div>

      <div className="form-group">
        <input type="time" className="form-control" placeholder="End time" {...endTime}/>
      </div>

      <div className="form-group">
        <input type="text" className="form-control" placeholder="Location" {...location} />
      </div>

      <div className="form-group">
        <textarea className="form-control" placeholder="Notes" {...notes} />
      </div>

      <div className="edit-modal-button-containter">
        <div>
          <button className="btn-global  edit-modal-buttons" type="submit">Update </button>
        </div>

        <div>
          <button className="btn-global" onClick={this.handleDelete.bind(this)}  type="submit">Delete</button>
        </div>
      </div>

    </form>

  </Modal> );

  }
}

export default reduxForm({
  form: 'editAppointment',
  fields: ['date', 'startTime', 'endTime', 'location', 'notes', 'title']},
  state => ({
  auth: state.auth,
  mentor: state.learner.currentMentor,
  appt: state.appointments.event,
  initialValues: state.appointments.event
}), actions)(AppointmentEdit);
