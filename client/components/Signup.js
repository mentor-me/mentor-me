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
    const { handleSubmit, fields: { username, firstname, lastname, learnerStyle, meetingFormat, email, password } } = this.props;

    return (
        <div className="spacer50">
    			<div className="container">
    			  <div className="row">
    			  	<div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <h2 className="header-tag">signup</h2>
                <h1 className="sub-header">Your ideal <em>mentor</em> is waiting for you.</h1>
                <div className="spacer30"></div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" {...username} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" {...firstname} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" {...lastname} />
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
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className="form-group">
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

export default reduxForm({
  form: 'signup',
  fields: ['username', 'firstname', 'lastname', 'learnerStyle', 'meetingFormat', 'email', 'password'],
}, null, { signupUser })(Signup);
