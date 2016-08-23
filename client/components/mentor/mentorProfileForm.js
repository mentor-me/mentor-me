import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { signupMentor, updateLearner } from '../../actions/auth.js';

class BecomeMentor extends Component {

  handleFormSubmit(formProps) {
    console.log("these are the form props", formProps)
    console.log("these are the AUTH form props", this.props.auth)
    this.props.updateLearner(formProps, this.props.auth);
  }

  createLearnerStylePreferences() {
    const options = ['Visual', 'Academic'];
    return options.map((option, i) => {
      return <option key={i} > {option} </option>;
    });
  }

  createMeetingFormatPreferences() {
    const options = ['Remote', 'In Person'];
    return options.map((option, i) => {
      return <option key={i} > {option} </option>;
    });
  }

  render() {
    const { handleSubmit, fields: { learnerStyle, meetingFormat} } = this.props;
    console.log("this is in the render ", this.props.auth)
    return (
      <form className="form-control profile-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>


        <div className="error-message">{learnerStyle.touched && learnerStyle.error ? learnerStyle.error : ''}</div>
        <div className={`form-group ${learnerStyle.touched && learnerStyle.error ? 'has-danger' : ''}`}>
          <label ><small><strong>What is your prefered learning style.   </strong>   <em className="sub-form">Please hold command choose more than one</em></small></label>
          <select  className="form-control form-muti"  multiple{...learnerStyle} >
            {this.createLearnerStylePreferences()}
          </select>
        </div>
        <div className="error-message">{meetingFormat.touched && meetingFormat.error ? meetingFormat.error : ''}</div>
        <div className={`form-group ${meetingFormat.touched && meetingFormat.error ? 'has-danger' : ''}`}>
          <label ><small><strong>How would you like to meet.   </strong>  <em className="sub-form">Please hold command choose more than one</em></small></label>
          <select className="form-control form-muti" multiple{...meetingFormat} >
            {this.createMeetingFormatPreferences()}
          </select>
        </div>


    <button className="btn-global" type="submit"> Sign Up </button>








      </form>

    );
  }
}

const validate = formProps => {
  const errors = {}

  if(!formProps.learnerStyle) {
        errors.learnerStyle = 'Required';
  }
  if(!formProps.meetingFormat) {
        errors.meetingFormat = 'Required';
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
  };
}
export default reduxForm({
  form: 'becomeMentor',
  fields: [ 'learnerStyle', 'meetingFormat'],
  validate
}, mapStateToProps, { updateLearner })(BecomeMentor);
