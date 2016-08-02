import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/auth.js';

class Login extends Component {

   handleFormSubmit(formProps) {
     this.props.loginUser(formProps);
   }

  render(){

    const { handleSubmit, fields: { role, email, password }} = this.props;

    return (
        <div className="spacer50">
    			<div className="container">
    			  <div className="row">
    			  	<div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <h2 className="header-tag">login</h2>
                <h1 className="sub-header">Move your career <em>foward</em> today.</h1>
                <div className="spacer30"></div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Password" {...password} />
                  </div>
                  <button className="btn-global" type="submit"> Log In </button>
                </form>
                <div className="redirect">
                  Don't have an account? <Link to={"/signup"}>SIGN UP</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
}, null, { loginUser })(Login);
