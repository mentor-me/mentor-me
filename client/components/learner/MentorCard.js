import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

import MentorProfile from '../universal/MentorProfile';
import SkillPill from '../universal/SkillPill';

import { fetchCurrentMentor } from '../../actions/learners';

class MentorCard extends Component {


  fetchMentor() {
    this.props.fetchCurrentMentor(this.props.mentor)
  }

  render() {
    let imgPath = 'client/assets/images/user.jpg';
    let { mentor } = this.props;

    let pills = mentor.Skills.map((skill, i) => {
      return <SkillPill skill={ skill.title } key={ i } />
    })

    return (
      <div className="row mentor-card animated slideInUp">
        <div className="card">
          <div className="card-block">
            <div className="card-title">
              <span className="mentor-card-name">
                {mentor.firstname} {mentor.lastname}
              </span>
              <span className="online-status">
                { mentor.availability ? <i className="fa fa-circle" /> : '' }
              </span>
              <span className="mentor-card-rating pull-right">
                <StarRatingComponent
                  name="rate1"
                  value={ mentor.rating / 100 }
                  starCount={5}
                  starColor={"#d94744"}
                  editing={false}
                />
              </span>
            </div>
            <div className="card-text" style={{"display": "table", "marginBottom": "10px"}}>
              { pills }
            </div>
            <p className="card-text card-description">
              { mentor.description }
            </p>
            <Link to={this.props.link} >
              <button onClick={ () => this.fetchMentor() } className="btn-global" >
                See {mentor.firstname}'s Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchCurrentMentor })(MentorCard);
