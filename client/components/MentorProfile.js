import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import SkillPill from './SkillPill';
import ReviewEntry from './ReviewEntry';
import EmptyReviewEntry from './EmptyReviewEntry';

class MentorProfile extends Component {

renderTopCard() {

    const { currentMentor, auth } = this.props;
    /* Check to see whether USER is a MENTOR (1) or LEARNER (2) */
    if (currentMentor) {
      if( auth.primary_role == 2 ) {
        return (
          <div className="card mentor-profile">
            <div className="card-block">
              <img className="img-circle mentor-img" src="http://www.asthmamd.org/images/icon_user_1.png" />
              <h4 className="card-title mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h4>
              {/*<Link to={`/learner/${auth.username}/mentor/${currentMentor.username}/schedule`} >*/}

              <Link to={`learner/${auth.username}/calendar`}>
              <button className="btn-global pull-right"> Schedule a Meeting </button>
              </Link>

              {/*</Link>*/}
              <Link to={`/learner/${auth.username}/mentor/${currentMentor.username}/review`} >
                <button className="btn-global pull-right"> Submit a Review </button>
              </Link>
              <button className="btn-global pull-right"> Send a Message </button>
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
  }

  renderAboutCard() {
    let { currentMentor } = this.props;
    if (currentMentor) {
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
  }

  renderExpertiseCard() {
    let { Skills } = this.props.currentMentor;
    if (Skills) {
      let pills = Skills.map((skill, i) => {
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
  }

  renderReview() {
    let { currentMentorReviews } = this.props;
    let { currentMentor } = this.props;
    if (currentMentorReviews){
      return currentMentorReviews.map((review, i) => {
        return <ReviewEntry mentor={currentMentor} review={review} key={i} />
      })
    }
    // else {
    //   return <EmptyReviewEntry />
    // }
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
          <div className="col-sm-6 left-card">
            {this.renderAboutCard()}
          </div>
          <div className="col-sm-6 right-card">
            {this.renderExpertiseCard()}
          </div>
        </div>
        <div className="row">
          {this.renderReview()}
        </div>
        <div className="spacer-bottom" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMentor: state.learner.currentMentor,
    currentMentorReviews: state.learner.currentMentorReviews,
    auth: state.auth.currentUser
  };
}

export default connect(mapStateToProps)(MentorProfile);
