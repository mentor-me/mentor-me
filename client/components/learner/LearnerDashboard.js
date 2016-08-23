import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPreferences } from '../../actions/learners';
import { mentorSortPrefs } from '../../utils/utils';

import MentorCard from './MentorCard';
import Search from './Search';
import LearnerPreferences from './LearnerPreferences';
import Loader from '../universal/Loader';

class LearnerDashboard extends Component {

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.fetchPreferences(user.id);
  }

  renderMentors() {
    let { mentors, auth } = this.props;
    if(mentors.length === 0 ) {
      return <div className="message-info">We did not find anyone matching your search terms </div>
    }
    if(mentors){
      return mentors.map((mentor, i) => {
        if (mentor) {
          let mentorLink = `/learner/${auth.username}/mentor/${mentor.username}/profile`;
          return <MentorCard key={ i } mentor={ mentor } link={ mentorLink } />;
        }
      });
    }
  }

  render() {
    let { loading, auth } = this.props;
    return (
      <div className="spacer30">
        <div className="container-fluid learner">
          <div className="row">
            <div className="col-sm-3">
              { auth ? <LearnerPreferences id={ auth.id } /> : '' }
            </div>
            <div className="col-sm-9">
              <div className="row search">
                <Search />
              </div>
                { loading ? <Loader /> : this.renderMentors() }
            </div>
          </div>
          <div className="spacer-bottom" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mentors: state.learner.modifiedMentors,
    auth: state.auth.currentUser,
    loading: state.learner.loadingDashboard
  };
}

export default connect(mapStateToProps, { fetchPreferences })(LearnerDashboard);
