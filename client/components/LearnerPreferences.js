import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { fetchPreferences, putPreferences, changePreferences, fetchModifiedMentors } from '../actions/learners';
import { mentorSortPrefs } from '../utils/utils';

/* Redux Form Fields */
export const fields = ['visual', 'academic', 'remote', 'inPerson', 'radiusZip', 'radius'];

class LearnerPreferences extends Component {

  componentWillMount() {
    this.props.fetchPreferences(2);
  }


  handleZipSubmit(formProps) {
    console.log('this is the form props: ', formProps)
    this.props.fetchModifiedMentors(formProps); //formProps
  }

  handleRadioChange() {
    console.log('group change')
    console.log('THIS PROPS PREFS---', this.props.prefs)
    this.props.changePreferences(2, this.props.prefs);
  }

  render() {

    const { handleSubmit, fields: { visual, academic, remote, inPerson, radiusZip, radius }, prefs } = this.props;

    let showInput = prefs.inPerson ? '' : 'hide';
    let inputClasses = `${showInput} input-group`;


    return (
      <div className="card">
        <div className="card-header">Preferences</div>
          <ul className="list-group list-group-flush">
            <div>
                <li className="list-group-item">
                  <label>Learner Style</label>
                    <label key={"visual"}>
                      <input type="checkbox" {...visual} value="visual" checked={prefs.visual}
                        onChange={(event) => {
                                console.log("this is checked")
                              visual.onChange(event.target.checked)
                              prefs.visual = !visual.checked
                              this.handleRadioChange()
                              console.log(this.props.prefs)

                            }} /> Visual
                    </label>
                    <label key={"academic"}>
                      <input type="checkbox"  value="academic" checked={prefs.academic} {...academic}
                        onChange={(event) => {
                              console.log("this is checked",academic)
                            academic.onChange(event.target.checked)
                            prefs.academic = !academic.checked
                            this.handleRadioChange()

                          }} /> Academic
                    </label>
                </li>
                <li className="list-group-item">
                  <label>Distance</label>
                    <label key={"remote"}>
                      <input type="checkbox"  value="remote" checked={prefs.remote} {...remote}
                        onChange={(event) => {
                                console.log("this is checked")
                              remote.onChange(event.target.checked)
                              prefs.remote = !remote.checked
                              this.handleRadioChange()
                      }}  /> Remote
                    </label>

                    <label key={inPerson}>
                      <input type="checkbox"  value="inPerson" checked={prefs.inPerson} {...inPerson}
                          onChange={(event) => {
                              console.log("this is checked")
                              inPerson.onChange(event.target.checked)
                              prefs.inPerson = !inPerson.checked
                              this.handleRadioChange()
                            }}
                        /> Local
                    </label>
                  <form onSubmit={handleSubmit(this.handleZipSubmit.bind(this))} >
                    <div className={inputClasses}>
                      <input type="text" value=" " className="form-control" placeholder="Enter zip code" {...radiusZip} />
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
    prefs: state.learner.preferences,
    initialValues: state.learner.preferences
  };
}

export default reduxForm({
  form: 'preferences',
  fields
}, mapStateToProps, { fetchPreferences, putPreferences, changePreferences, fetchModifiedMentors })(LearnerPreferences);
