import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { fetchMentors } from '../actions/learners';

/* Sub Components */
import MentorCard from './MentorCard';
import Search from './Search';

/* Redux Form Fields */
export const fields = [ 'learnerStyle', 'distance' ]

class Learner extends Component {

  componentWillMount() {
    this.props.fetchMentors();
  }

  renderPreferenceButtons() {

    const { fields: { learnerStyle, distance } } = this.props;

    return (
      <div>
        <li className="list-group-item">
          <label>Learner Style</label>
          <div>
            <label>
              <input type="radio" {...learnerStyle} value="male" /> Visual
            </label>
            <label>
              <input type="radio" {...learnerStyle} value="female" /> Academic
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <label>Distance</label>
          <div>
            <label>
              <input type="radio" {...distance} value="male" /> Remote
            </label>
            <label>
              <input type="radio" {...distance} value="female" /> Local
            </label>
          </div>
        </li>
      </div>
    )
  }

  renderMentors() {

    let { mentors } = this.props;
      return mentors.map((mentor, i) => {
        return <MentorCard key={ i } mentor={ mentor } />
      })
  }


  render() {

    return(
      <div className="spacer30">
        <div className="container-fluid learner">
          <div className="row">
            <div className="col-sm-4">
              <div className="card">
                <div className="card-header">Preferences</div>
                  <ul className="list-group list-group-flush">
                    { this.renderPreferenceButtons() }
                  </ul>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="row search">
                <Search />
              </div>
                { this.renderMentors() }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return { mentors: state.learner.mentors }
}

export default reduxForm({
  form: 'preferences',
  fields
}, mapStateToProps, { fetchMentors })(Learner)
