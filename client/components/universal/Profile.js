import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Sub Components */
import LearnerProfileForm from '../learner/learnerProfileForm';
import MentorProfileForm  from '../mentor/mentorProfileForm';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { showDrawer: false };
  }

  renderForm(){
    // console.log(this.props.auth.primary_role,this.props.auth.secondary_role )
    if(this.props.auth.primary_role === "1" && this.props.auth.secondary_role === "2" ){
      return (
        <div>
          <div className="card-block">
            <h4 className="card-text activate-account"> You have both a Learner and Mentor Account </h4>
          </div>
        </div>
      )
    } else if (this.props.auth.primary_role === "1"){
      return (
        <div className="card-block">
          <h4 className="card-text activate-account"> Activate Your Learner Account Today. </h4>
            <i onClick={ () => this.setState({ showDrawer: !this.state.showDrawer }) } className="fa fa-plus-square-o pull-right"></i>
            <MentorProfileForm />
        </div>
      )
    } else {
      return (

          <div className="card-block">
            <h4 className="card-text activate-account"> Activate Your Mentoring Account Today. </h4>
              <i onClick={ () => this.setState({ showDrawer: !this.state.showDrawer }) } className="fa fa-plus-square-o pull-right"></i>
              <LearnerProfileForm />
          </div>
      )
    }
  }

  render() {

    let drawer = this.state.showDrawer ? 'card drawer show-drawer' : 'card drawer';
    const { auth } = this.props;

      return (

        <div className="spacer30 learner-profile">
          <div className="container-fluid">
            <div className="row">
              <div className={drawer}>

                {this.renderForm()}

              </div>
            </div>
            <div className="row">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title"> Profile Information </h4>
                  <div>
                    <p className="card-text"><span>Your Username:</span> {auth.username} </p>
                    <p className="card-text"><span>Your Name:</span> {auth.firstname} {auth.lastname} </p>
                    <p className="card-text"><span>Your Email:</span> {auth.email} </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Profile);
