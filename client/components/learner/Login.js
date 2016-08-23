import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { loginUser, authError } from '../../actions/auth.js';

class Login extends Component {

  componentWillMount() {
    this.props.authError("");
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderMessageAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="message-info">
          {this.props.errorMessage}
        </div>
        );
      }
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
        <div className="spacer50">
    			<div className="container">
    			  <div className="row">
    			  	<div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <h2 className="header-tag">login</h2>
                <h1 className="sub-header">Move your career<em>foward</em> today.</h1>
                <div className="spacer30"></div>
                  {this.renderMessageAlert()}
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" {...email} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" type="password" placeholder="Password" {...password} />
                  </div>
                  <button className="btn-global" type="submit"> Log In </button>
                </form>
                <div className="redirect">
                  <p>Dont have an account? <Link to={"/signup"}>SIGN UP</Link></p>
                  <p>Are you a Mentor? <Link to={"become/login"}>LOGIN</Link></p>
                </div>
            </div>
          </div>
        </div>
        <div className="spacer-bottom"></div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
}, mapStateToProps, { loginUser, authError })(Login);
