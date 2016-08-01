import React, { Component } from 'react';

export default class MentorCard extends Component {

  render() {

    const { mentor } = this.props;

    return (
      <div className="row">
        <div className="card">
          <div className="card-block">
          <h4 className="card-title">{ mentor.firstname }</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn-global" type="submit">
          See John's Profile
          </button>
          </div>
        </div>
      </div>
    )
  }


}
