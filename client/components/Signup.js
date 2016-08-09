import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { signupUser } from '../actions/auth.js';

class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  createLearnerStylePreferences() {
    const options = ['Visual', 'Academic'];
    return options.map((option, i) => {
      return <option key={i}> {option} </option>;
    });
  }

  createMeetingFormatPreferences() {
    const options = ['Remote', 'In Person'];
    return options.map((option, i) => {
      return <option key={i}> {option} </option>;
    });
  }

  render() {
    const { handleSubmit, fields: { username, firstname, lastname, zipCode, learnerStyle, meetingFormat, email, password } } = this.props;

    return (
        <div className="spacer50">
    			<div className="container">
    			  <div className="row">
    			  	<div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <h2 className="header-tag">signup</h2>
                <h1 className="sub-header">Your ideal <em>mentor</em> is waiting for you.</h1>
                <div className="spacer30"></div>
                  <div className="error-message">{username.touched && username.error ? username.error : ''}</div>
                  <div className={`form-group ${username.touched && username.error ? 'has-danger' : ''}`}>
                    <input type="text" className="form-control" placeholder="Username" {...username} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" {...firstname} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" {...lastname} />
                  </div>
                  <div className="error-message">{zipCode.touched && zipCode.error ? zipCode.error : ''}</div>
                  <div className={`form-group ${email.touched && email.error ? 'has-danger' : ''}`}>
                    <input type="text" className="form-control" placeholder="Zip Code" {...zipCode} />
                  </div>
                  <div className="form-group">
                    <select className="form-control" {...learnerStyle} >
                    <option>Select your learner style...</option>
                      {this.createLearnerStylePreferences()}
                    </select>
                  </div>
                  <div className="form-group">
                    <select className="form-control" {...meetingFormat} >
                    <option>Select a preferred meeting format...</option>
                      {this.createMeetingFormatPreferences()}
                    </select>
                  </div>
                  <div className={`form-group ${email.touched && email.error ? 'has-danger' : ''}`}>
                    <input type="text" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className="error-message">{password.touched && password.error ? password.error : ''}</div>
                  <div className={`form-group ${password.touched && password.error ? 'has-danger' : ''}`}>
                    <input type="text" className="form-control" type="password" placeholder="Password" {...password} />
                  </div>
                  <button className="btn-global" type="submit"> Sign Up </button>
                </form>
                <div className="redirect">
                  Already have an account? <Link to={"/login"}>LOG IN</Link>
                </div>
            </div>
          </div>
        </div>
        <div className="spacer-bottom"></div>
      </div>
    );
  }

}

const validate = formProps => {
  const errors = {}
  if (!formProps.username) {
    errors.username = 'Required'
  } else if (formProps.username.length > 6) {
    errors.username = 'Must be 6 characters or less'
  }
  if (!formProps.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if(formProps.password){
    if (formProps.password.length < 7){
      errors.password = 'Password must be at least 7 characters'
    }
  }
  if(!formProps.zipCode) {
    errors.zipCode = 'Required';
  }
  else if (!( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(formProps.zipCode))){
        errors.zipCode = 'Invalid zipcode';
  }
  return errors
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'firstname', 'zipCode', 'lastname', 'learnerStyle', 'meetingFormat', 'email', 'password', 'passwordConfirm'],
  validate
}, null, { signupUser })(Signup);
