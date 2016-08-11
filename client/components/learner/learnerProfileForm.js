import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { signupMentor, updateMentor } from '../../actions/auth.js';


class BecomeMentor extends Component {

  handleFormSubmit(formProps) {
    console.log("these are the form props", formProps)
    this.props.updateMentor(formProps, this.props.auth);
  }

    createQualitiesStyleQualities() {
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
        <div className="form-group">
          <select className="form-control" {...teachingStyle} >
          <option>Select your learner style...</option>
            {this.createQualitiesStyleQualities()}
          </select>
        </div>
        <div className="form-group">
          <select className="form-control" {...meetingFormat} >
          <option>Select a preferred meeting format...</option>
            {this.createMeetingFormatQualities()}
          </select>
          <button className="btn-global" type="submit"> Sign Up </button>
        </div>
      </form>

    );
  }
}


const validate = formProps => {
  const errors = {}
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
