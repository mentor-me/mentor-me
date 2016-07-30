import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/auth.js';

class Login extends Component {

   handleFormSubmit(formProps) {
     this.props.loginUser(formProps);
   }

  generateOptions() {
     const options = ['Learner', 'Mentor'];
     return options.map( (option, i) => {
       return <option key={i}> {option} </option>
     })
  }

  render(){

    const { handleSubmit, fields: { role, email, password }} = this.props;

    return (

        <div className="row">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
              <div className="form-group">
                <label className="control-label">Login as:</label>
                <select className="form-control" {...role} >
                  { this.generateOptions() }
                </select>
              </div>
              <div className="form-group">
                <label className="control-label">Email</label>
                <input type="text" className="form-control" {...email} />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input type="text" className="form-control" {...password} />
              </div>
              <button className="btn" type="submit"> Login </button>
            </form>
        </div>

    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['role', 'email', 'password']
}, null, { loginUser })(Login);
