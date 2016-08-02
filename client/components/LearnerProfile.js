import React, { Component } from 'react';
import { connect } from 'react-redux';


class LearnerProfile extends Component {

  render() {
    const { auth } = this.props;

    if (auth) {
      return (
        <div className="spacer30">
          <div className="container-fluid learner">
            <div className="row">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title"> Profile Information </h4>
                  <div className="card-text">
                    <p> Username: {auth.username} </p>
                    <p> Firstname: {auth.firstname} </p>
                    <p> Lastname: {auth.lastname} </p>
                    <p> Email: {auth.email} </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    } else {
      return (
        <div> Loading... </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
  };
}

export default connect(mapStateToProps)(LearnerProfile);
