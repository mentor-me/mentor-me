import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { fetchPreferences, putPreferences, changePreferences } from '../actions/learners';

/* Redux Form Fields */
export const fields = ['learnerStyle', 'distance', 'zipCode'];

class LearnerPreferences extends Component {

  componentWillMount() {
    this.props.fetchPreferences(this.props.id);
    // this.props.initializeForm(this.props.prefs);
  }


  handleZipSubmit(formProps) {
    console.log('this is the form props: ', formProps.zipCode)
    this.props.putPreferences(formProps);
  }

  handleRadioChange() {
    console.log('group change')
    console.log(this.props)
    this.props.changePreferences('yo');
  }

  render() {

    const { handleSubmit, fields: { learnerStyle, distance, zipCode }, prefs } = this.props;

    let showInput = this.props.values.distance === "inPerson" ? '' : 'hide';
    let inputClasses = `${showInput} input-group`;

    return (
      <div className="card">
        <div className="card-header">Preferences</div>
          <ul className="list-group list-group-flush">
            <div>
                <li className="list-group-item">
                  <label>Learner Style</label>
                  <div onChange={this.handleRadioChange.bind(this)}>
                    <label>
                      <input type="radio" {...learnerStyle} value="visual" checked={learnerStyle.value === 'visual'} /> Visual
                    </label>
                    <label>
                      <input type="radio" {...learnerStyle} value="academic" checked={learnerStyle.value === 'academic'} /> Academic
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <label>Distance</label>
                  <div onChange={this.handleRadioChange.bind(this)}>
                    <label>
                      <input type="radio" {...distance} value="remote" checked={distance.value === 'remote'} onChange={ distance.onChange } /> Remote
                    </label>
                    <label>
                      <input type="radio" {...distance} value="inPerson" checked={distance.value === 'inPerson'} onChange={ distance.onChange } /> Local
                    </label>
                  </div>
                  <form onSubmit={handleSubmit(this.handleZipSubmit.bind(this))} >
                    <div className={inputClasses}>
                      <input type="text" className="form-control" placeholder="Enter zip code" {...zipCode} />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary input-group-btn-custom" type="submit"><i className="fa fa-map-marker" /></button>
                      </span>
                    </div>
                  </form>
                </li>
            </div>
          </ul>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    prefs: state.learner.preferences
  };
}

export default reduxForm({
  form: 'preferences',
  fields,
}, mapStateToProps, { fetchPreferences, putPreferences, changePreferences })(LearnerPreferences);
