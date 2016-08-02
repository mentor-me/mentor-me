import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentMentor } from '../actions/learners';

class MentorProfile extends Component {

  componentWillMount() {
    this.props.fetchCurrentMentor(this.props.params.mentorUsername);
  }

  renderTopCard() {

    let { currentMentor } = this.props;
    let imgPath = `./client/assets/images/user.jpg`;

    return (
      <div className="card">
        <div className="card-block flex-container">
          <img className="img-circle mentor-img" style={{'width': '50px'}} src="http://www.m1m.com/wp-content/uploads/2015/06/default-user-avatar.png" />
          <h3 className="card-title mentor-name"> { currentMentor.firstname } </h3>
      </div>
    </div>
    )
  }

  render() {

    console.log('inside mentor profile: ', this.props.mentor)

    return (
      <div className="spacer30">
        <div className="container-fluid learner">
          <div className="row">
            { this.renderTopCard() }
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state){

  return {
    currentMentor: state.learner.currentMentor
  }
}

export default connect(mapStateToProps, { fetchCurrentMentor })(MentorProfile);
