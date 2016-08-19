import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';

import SkillPill from './SkillPill';
import ReviewEntry from './ReviewEntry';
import Loader from './Loader';

import { fetchMentorReviews } from '../actions/mentors';
import { accessConversation, currentConversation, openChatBox } from '../actions/chat';

class MentorProfile extends Component {

componentWillMount() {
  let user = JSON.parse(localStorage.getItem('user'));
  // let { auth } = this.props;
  if (user.primary_role == 1) {
    this.props.fetchMentorReviews(user.id)
  }
}

loadChatMessages(convo) {
  let { chat, currentMentor, auth } = this.props;
  socket.emit('disconnect chat', chat.currentConversation.id);
  // socket.emit('chat mounted', convo.id);
  // this.props.currentConversation( convo.id );
  let data = {
    recipient: currentMentor.username,
    name: `${auth.username}${currentMentor.username}`,
    private: true,
    mentorId: currentMentor.id,
    learnerId: auth.id
  }
  this.props.accessConversation( data );
  // this.props.openChatBox();
}

renderTopCard() {
    let { currentMentor, auth } = this.props;
    if (currentMentor && auth) {
      let convo = {
        mentorId: currentMentor.id,
        name: `${auth.username}${currentMentor.username}`,
        private: true,
        username: auth.username,
        uid: auth.id
      };
      if (auth.secondary_role == 2) {
        return (
          <div className="card mentor-profile">
            <div className="card-block btn-container">
              <Link to={`/learner/${auth.username}/mentor/${currentMentor.username}/calendar`}>
                <button className="btn-global pull-right">
                  Schedule Meeting <i className="fa fa-calendar"/>
                </button>
              </Link>
              <Link to={`/learner/${auth.username}/mentor/${currentMentor.username}/review`} >
                <button className="btn-global pull-right">
                  Submit Review <i className="fa fa-pencil"/>
                </button>
              </Link>
              <button onClick={ () => this.loadChatMessages(convo) } className="btn-global pull-right">
                Send Message <i className="fa fa-envelope-o"/>
              </button>
            </div>
          </div>
        );
      /* If the person loggin in is a mentor (primary role 1) */
      } else {
        return (
          <div className="card mentor-profile">
            <div className="card-block">
              <h3 className="card-title mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h3>
              <div className="btn-global pull-right">Your Avg. Rating: {currentMentor.rating ? (currentMentor.rating / 100) : 'N/A'}</div>
            </div>
          </div>
        )
      }
    }
  }

  renderAboutCard() {

    let { currentMentor, auth } = this.props;
    if (currentMentor) {
      return (
        <div className="card fixed-height">
          <div className="card-block">
            <div className="picture-title">
              <Gravatar email={currentMentor.email} https />
              <h4 className="mentor-name"> {currentMentor.firstname} {currentMentor.lastname} </h4>
            </div>
            <div className="card-text">
            { currentMentor.description }
            </div>
          </div>
        </div>
      );
    }
  }

  renderExpertiseCard() {
    // CHANGE THIS
    let { Skills } = this.props.currentMentor;
    // TODO: DO NOT HARD CODE THIS - FIND DIFF WAY TO ACCESS
    // CURRENT MENTOR SKILLS FOR MENTOR!!!!
    let tempPills = [{title: 'coffee'}, {title: 'tea'}];
      let pills = tempPills.map((skill, i) => {
        return <SkillPill skill={ skill.title } key={ i } />
      })
      return (
        <div className="card fixed-height">
          <div className="card-block">
            <h4 className="card-title">
            Areas of Expertise
            </h4>
            <div className="card-text">
            { pills }
            </div>
          </div>
        </div>
      );
  }

  renderReview() {
    let { currentMentorReviews, currentMentor, mentor, auth } = this.props;
    let reviews = auth.secondary_role == 2 ? currentMentorReviews : mentor.reviews;
      return reviews.map((review, i) => {
        return <ReviewEntry mentor={currentMentor} review={review} key={i} />
      })
  }

  render() {
    let { loading } = this.props;
    if (loading) {
      return (<Loader />)
    } else {
      return (
        <div className="spacer30 mentor-profile">
          <div className="row">
            <div className="col-sm-12">
              { this.renderTopCard() }
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 left-card">
              { this.renderAboutCard() }
            </div>
            <div className="col-sm-6 right-card">
              { this.renderExpertiseCard() }
            </div>
          </div>
          <div className="row">
            { this.renderReview() }
          </div>
          <div className="spacer-bottom" />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    currentMentor: state.learner.currentMentor,
    currentMentorReviews: state.learner.currentMentorReviews,
    auth: state.auth.currentUser,
    loading: state.learner.loadingMentor,
    mentor: state.mentor,
    chat: state.chat
  };
}

export default connect(mapStateToProps, { accessConversation, fetchMentorReviews, currentConversation, openChatBox })(MentorProfile);
