import React, { Component } from 'react';
import { Link } from 'react-router';

import MentorProfile from './MentorProfile';
import SkillPill from './SkillPill';

export default class MentorCard extends Component {

  render() {
    const imgPath = 'client/assets/images/user.jpg';
    const { mentor } = this.props;

    let pills = mentor.Skills.map((skill, i) => {
      return <SkillPill skill={ skill.title } key={ i } />
    })

    return (
      <div className="row mentor-card">
        <div className="card">
          <div className="card-block">
            <div className="card-title">
              <span className="mentor-card-name">
                {mentor.firstname} {mentor.lastname}
              </span>
              <span className="online-status">
                <span>Last seen 32m ago</span>
              </span>
              <span className="mentor-card-rating pull-right">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </span>
            </div>
            <div className="card-text" style={{"display": "table", "margin-bottom": "10px"}}>
              { pills }
            </div>
            <p className="card-text">
              { mentor.description }
            </p>
            <Link to={this.props.link} >
              <button className="btn-global" >
                See {mentor.firstname}'s Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }


}
