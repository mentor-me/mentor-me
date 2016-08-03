import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { fetchPreferences } from '../actions/learners';

/* Redux Form Fields */
export const fields = ['learnerStyle', 'distance'];

class LearnerPreferences extends Component {

  componentWillMount() {
    let { id } = this.props.auth.currentUser;
    this.props.fetchPreferences(id);
  }

  renderPreferenceButtons() {
    const { fields: { learnerStyle, distance }, prefs } = this.props;

    return (
      <div>
        <li className="list-group-item">
          <label>Learner Style</label>
          <div>
            <label>
              <input type="radio" {...learnerStyle} value="visual" checked={prefs.visual ? true : false} /> Visual
            </label>
            <label>
              <input type="radio" {...learnerStyle} value="academic" checked={prefs.academic ? true : false} /> Academic
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <label>Distance</label>
          <div>
            <label>
              <input type="radio" {...distance} value="remote" checked={prefs.remote ? true : false} /> Remote
            </label>
            <label>
              <input type="radio" {...distance} value="inPerson" checked={prefs.inPerson ? true : false} /> Local
            </label>
          </div>
        </li>
      </div>
    );
  }

  render() {

    return (
      <div className="card">
        <div className="card-header">Preferences</div>
          <ul className="list-group list-group-flush">
            {this.renderPreferenceButtons()}
          </ul>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    prefs: state.learner.preferences,
  };
}

export default reduxForm({
  form: 'preferences',
  fields,
}, mapStateToProps, { fetchPreferences })(LearnerPreferences);
