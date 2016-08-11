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
    const { handleSubmit, fields: { teachingStyle, meetingFormat} } = this.props;
    console.log("this is in the render ", this.props.auth)
    return (
      <form className="form-control profile-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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





function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
  };
}
export default reduxForm({
  form: 'becomeMentor',
  fields: [ 'teachingStyle', 'meetingFormat']
}, mapStateToProps, { updateLearner })(BecomeMentor);
