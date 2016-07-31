import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="spacer50" />
          <div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
            <h2 className="header-tag">give back</h2>
            <h1 className="sub-header">And become a mentor <em>today</em>.</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <button className="btn-global" type="submit"> Start Mentoring </button>
          </div>
        </div>
      </div>
    );
  }
}
