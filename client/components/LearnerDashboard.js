import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMentors } from '../actions/learners';

/* Sub Components */
import MentorCard from './MentorCard';
import Search from './Search';
import LearnerPreferences from './LearnerPreferences';

class LearnerDashboard extends Component {

  componentWillMount() {
    this.props.fetchMentors();
  }

  renderMentors() {
    let { mentors, auth } = this.props;
    return mentors.map((mentor, i) => {
      let mentorLink = `/learner/${auth}/mentor/${mentor.username}/profile`;
      return <MentorCard key={i} mentor={mentor} link={mentorLink} />;
    });
  }


  render() {
    return (
      <div className="spacer30">
        <div className="container-fluid learner">
          <div className="row">
            <div className="col-sm-4">
              <LearnerPreferences />
            </div>
            <div className="col-sm-8">
              <div className="row search">
                <Search />
              </div>
                {this.renderMentors()}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    mentors: state.learner.mentors,
    auth: state.auth.currentUser.username,
  };
}

export default connect(mapStateToProps, { fetchMentors })(LearnerDashboard);
