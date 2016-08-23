import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';

import { changePreferences, fetchModifiedMentors, fetchPreferences } from '../../actions/learners';
import { mentorSortPrefs } from '../../utils/utils';

/* Redux Form Fields */
export const fields = ['visual', 'academic', 'remote', 'inPerson', 'radiusZip', 'radius'];

class LearnerPreferences extends Component {

  /* This only fires when zip is submitted */
  handleZipSubmit() {
    let { id } = this.props.auth
    /* Pass second argument here in order to filter on ZIP */
    this.props.fetchPreferences(id, this.props.values.radiusZip, this.props.values.radius);
  }

  resubmitZip(){
    let { id } = this.props.auth
    this.props.fetchPreferences(id);
  }

  handleCheckChange() {
    let { id } = this.props.auth
    this.props.changePreferences(id, this.props.prefs);
  }

  render() {

    const { handleSubmit, fields: { visual, academic, remote, inPerson, radiusZip, radius }, prefs } = this.props;
    /* Toggle ZIP Code input depending on selection of local vs remote */
    let showInput = prefs.inPerson ? '' : 'hide';
    let inputClasses = `${showInput} input-group` ;

    return (
      <div className="card learner-preferences">
        <div className="card-header">Preferences</div>
          <ul className="list-group list-group-flush">
            <div>
              <li className="list-group-item">
                <label>Learner Style</label>
                  <label key={"visual"}>
                    <input type="checkbox" {...visual} value="visual" checked={prefs.visual}
                      onChange={(event) => {
                        visual.onChange(event.target.checked)
                        prefs.visual = !visual.checked
                        this.handleCheckChange()
                        console.log(this.props.prefs)
                      }}
                    /> Visual
                  </label>
                  <label key={"academic"}>
                    <input type="checkbox"  value="academic" checked={prefs.academic} {...academic}
                      onChange={(event) => {
                        academic.onChange(event.target.checked)
                        prefs.academic = !academic.checked
                        this.handleCheckChange()
                      }}
                    /> Academic
                  </label>
                </li>
                <li className="list-group-item">
                  <label>Distance</label>
                    <label key={"remote"}>
                      <input type="checkbox"  value="remote" checked={prefs.remote} {...remote}
                        onChange={(event) => {
                          remote.onChange(event.target.checked)
                          prefs.remote = !remote.checked
                          this.handleCheckChange()
                        }}
                      /> Remote
                    </label>
                    <label key={inPerson}>
                      <input type="checkbox"  value="inPerson" checked={prefs.inPerson} {...inPerson}
                          onChange={(event) => {
                            inPerson.onChange(event.target.checked)
                            prefs.inPerson = !inPerson.checked
                            console.log(inPerson.checked);
                            if(inPerson.checked && radiusZip.value !== ""){
                              this.resubmitZip(this.props.auth)
                            }
                            this.handleCheckChange();
                          }}
                      /> Local
                    </label>
                  <form onSubmit={handleSubmit(this.handleZipSubmit.bind(this))} onChange={ event => {
                      console.log(radiusZip)
                      if(radiusZip.value.length === 1) {
                        this.resubmitZip(this.props.auth)
                      }
                    }
                    }>


                    <input style={{marginBottom:"10px" }} className={`form-control radius ${showInput}`} type="text" ref="radius"  placeholder="Mile Radius" {...radius} />
                    <div className={`error-message  ${showInput}`}>{radiusZip.touched && radiusZip.error ? radiusZip.error : ''}</div>
                    <div className={`${showInput} input-group  ${radiusZip.touched && radiusZip.error ? 'has-danger' : ''}`}>

                    <input type="text" ref="zip" className="form-control" placeholder="Enter zip code" {...radiusZip} />
                    <span className="input-group-btn">
                        <button className={`btn btn-secondary input-group-btn-custom ${radiusZip.touched && radiusZip.error ? 'border-danger' : ''}`} type="submit"><i className="fa fa-map-marker" /></button>
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

const validate = formProps => {
  const errors = {};

  if(!formProps.radiusZip) {
    errors.radiusZip = 'Required';
  }
    else if (!( /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(formProps.radiusZip))){
        errors.radiusZip = 'Invalid zipcode';
  }

  return errors
}

function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
    prefs: state.learner.preferences,
    initialValues: state.learner.preferences,
    validate
  };
}

export default reduxForm({
  form: 'preferences',
  fields
}, mapStateToProps, { changePreferences, fetchModifiedMentors, fetchPreferences })(LearnerPreferences);
