import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentMentor } from '../actions/learners';
import SkillPill from './SkillPill';

class MentorProfile extends Component {

  componentWillMount() {
    this.props.fetchCurrentMentor(this.props.params.mentorUsername);
  }

  renderTopCard() {

    const { currentMentor, auth } = this.props;
    /* Check to see whether USER is a MENTOR (1) or LEARNER (2) */
    if( auth.primary_role == "2" ) {
      return (
        <div className="card mentor-profile">
          <div className="card-block">
            <img className="img-circle mentor-img" src="http://www.asthmamd.org/images/icon_user_1.png" />
            <h4 className="card-title mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h4>
            <button className="btn-global pull-right" type="submit"> Schedule a Meeting </button>
            <button className="btn-global pull-right" type="submit"> Submit a Review </button>
            <button className="btn-global pull-right" type="submit"> Send a Message </button>
        </div>
      </div>
      );
    } else {
      return (
        <div className="card mentor-profile">
          <div className="card-block">
            <img className="img-circle mentor-img" src="http://www.asthmamd.org/images/icon_user_1.png" />
            <h4 className="card-title mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h4>
        </div>
      </div>
      )
    }
  }

  renderAboutCard() {
    let { currentMentor } = this.props;
    return (
      <div className="card fixed-height">
        <div className="card-block">
          <h4 className="card-title"> About Me </h4>
          <div className="card-text">
            { currentMentor.description }
          </div>
        </div>
      </div>
    );
  }

  renderExpertiseCard() {
    let { currentMentor } = this.props;
    console.log(currentMentor)
    let pills = currentMentor.Skills.map((skill, i) => {
      return <SkillPill skill={ skill.title } key={ i } />
    })
    return (
      <div className="card fixed-height">
        <div className="card-block">
          <h4 className="card-title">
            Areas of Expertise
          </h4>
          <div className="card-text">
            {pills}
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
          <span className="reviewer-name"> Stan Smith </span>
          <span className="review-date"> 11/29/2015 </span>
          <span className="review-by pull-right"> <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /> </span>
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

    return (
      <div className="spacer30 mentor-profile">
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
    auth: state.auth.currentUser
  };
}

export default connect(mapStateToProps, { fetchCurrentMentor })(MentorProfile);
