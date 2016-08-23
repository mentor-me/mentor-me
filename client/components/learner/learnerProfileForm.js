import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { signupMentor, updateMentor } from '../../actions/auth.js';


class BecomeMentor extends Component {

  handleFormSubmit(formProps) {
    // console.log("these are the form props", formProps, "and auth ", this.props.auth)
    this.props.updateMentor(formProps, this.props.auth);
  }

    createQualitiesStyle() {
      const options = ['Visual', 'Academic'];
      return options.map((option, i) => {
        return <option key={i}> {option} </option>;
      });
    }

    createMeetingFormatQualities() {
      const options = ['Remote', 'In Person'];
      return options.map((option, i) => {
        return <option key={i}> {option} </option>;
      });
    }

  render() {
    const { handleSubmit, fields: {  teachingStyle, meetingFormat, description, skills } } = this.props;

    return (
      <form className="form-control profile-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
        <div className="error-message">{description.touched && description.error ? description.error : ''}</div>
          <textarea style={{"width": "100%"}} className="form-control profile-text-area" placeholder="Describe yourself here..." {...description} />
        </div>
        <div className="error-message">{skills.touched && skills.error ? skills.error : ''}</div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Your Skills" {...skills} />
        </div>

        <div className="error-message">{teachingStyle.touched && teachingStyle.error ? teachingStyle.error : ''}</div>
        <div className={`form-group ${teachingStyle.touched && teachingStyle.error ? 'has-danger' : ''}`}>
          <label ><small><strong>What is your prefered learning style.   </strong>   <em className="sub-form">Please hold command choose more than one</em></small></label>
          <select  className="form-control form-muti"  multiple{...teachingStyle} >
            {this.createQualitiesStyle()}
          </select>
        </div>
        <div className="error-message">{meetingFormat.touched && meetingFormat.error ? meetingFormat.error : ''}</div>
        <div className={`form-group ${meetingFormat.touched && meetingFormat.error ? 'has-danger' : ''}`}>
          <label ><small><strong>How would you like to meet.   </strong>  <em className="sub-form">Please hold command choose more than one</em></small></label>
          <select className="form-control form-muti" multiple{...meetingFormat} >
            {this.createMeetingFormatQualities()}
          </select>
        </div>
          <button className="btn-global" type="submit"> Sign Up </button>
      </form>

    );
  }
}


const validate = formProps => {
  const errors = {}

  if(!formProps.teachingStyle) {
        errors.teachingStyle = 'Required';
  }
  if(!formProps.meetingFormat) {
        errors.meetingFormat = 'Required';
  }
  if (formProps.description) {
    if(formProps.description.length < 100){
      errors.description = 'Your description should be at least 100 characters long.'
    }
  }
  if(!formProps.description){
    errors.description = 'Required'
  }
  if(!formProps.skills){
    errors.skills = 'Required'
  }

  return errors
}


function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
  };
}
export default reduxForm({
  form: 'becomeMentor',
  fields: [ 'teachingStyle', 'meetingFormat', 'description', 'skills'],
  validate
}, mapStateToProps, { updateMentor })(BecomeMentor);
