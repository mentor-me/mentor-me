import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentMentor } from '../actions/learners';

class MentorProfile extends Component {

  componentWillMount() {
    this.props.fetchCurrentMentor(this.props.params.mentorUsername);
  }

  renderTopCard() {
    const { currentMentor } = this.props;
    return (
      <div className="card mentor-profile">
        <div className="card-block">
          <img className="img-circle mentor-img" src="http://www.m1m.com/wp-content/uploads/2015/06/default-user-avatar.png" />
          <h4 className="card-title mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h4>
          <div className="mentor-rating">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </div>
          <button className="btn-global pull-right" type="submit"> Schedule Meeting </button>
      </div>
    </div>
    );
  }

  renderAboutCard() {
    const { currentMentor } = this.props;
    return (
      <div className="card mentor-profile">
        <div className="card-block">
          <h4 className="card-title"> About Me </h4>
          <div className="card-text">
            Here is a longer description about what I do, what I can offer, and why you should try and schedule an appointment with me as soon as possible.
          </div>
        </div>
      </div>
    );
  }

  renderExpertiseCard() {
    const { currentMentor } = this.props;
    return (
      <div className="card mentor-profile">
        <div className="card-block">
          <h4 className="card-title"> Areas of Expertise </h4>
          <div className="card-text">
            List stuff here.
          </div>
        </div>
      </div>
    );
  }

  renderReview() {
    const { currentMentor } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          Review ###
        </div>
        <div className="card-block">
          <blockquote className="card-blockquote">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          </blockquote>
        </div>
      </div>
    );
  }

  render() {
    console.log('inside mentor profile: ', this.props.mentor);

    return (
      <div className="spacer30">
        <div className="row">
          <div className="col-sm-12">
            {this.renderTopCard()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            {this.renderAboutCard()}
          </div>
          <div className="col-sm-6">
            {this.renderExpertiseCard()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderReview()}
          </div>
          <div className="col-sm-12">
            {this.renderReview()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMentor: state.learner.currentMentor,
  };
}

export default connect(mapStateToProps, { fetchCurrentMentor })(MentorProfile);
