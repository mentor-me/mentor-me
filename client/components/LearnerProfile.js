import React, { Component } from 'react';
import { connect } from 'react-redux';


class LearnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { showDrawer: false };
  }

  render() {

    let drawer = this.state.showDrawer ? 'card drawer show-drawer' : 'card drawer';

    const { auth } = this.props;
    /* TODO: Do state check on whether user has Primary / Seconary Role */
    /* If not, render ability to sign up for other role. If yes, then hide. */

      return (
        <div className="spacer30 learner-profile">
          <div className="container-fluid">
          <div className="row">
            <div className={drawer}>
              <div className="card-block">
                <h4 className="card-text activate-account"> Activate Your Mentoring Account Today. </h4>
                <i onClick={ () => this.setState({ showDrawer: !this.state.showDrawer }) } className="fa fa-plus-square-o pull-right"></i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title"> Profile Information </h4>
                  <div>
                    <p className="card-text"><span>Username:</span> {auth.username} </p>
                    <p className="card-text"><span>Name:</span> {auth.firstname} </p>
                    <p className="card-text"><span>Email:</span> {auth.email} </p>
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

export default connect(mapStateToProps)(LearnerProfile);
