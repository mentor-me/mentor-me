import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
export const fields = [ 'learnerStyle', 'distance' ]


class Learner extends Component {

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
    return (
      <div>
        <div className="row">
          <div className="card">
          <div className="card-block">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn-global" type="submit">
          See John's Profile
          </button>
          </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
          <div className="card-block">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn-global" type="submit">
          See John's Profile
          </button>
          </div>
          </div>
        </div>
      </div>
    )
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
                  <input className="form-control" type="text" placeholder="Search for a mentor..." />
              </div>
                { this.renderMentors() }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default reduxForm({
  form: 'preferences',
  fields
})(Learner)
