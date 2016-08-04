import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
        <div id="become">
          <div className="spacer50">
            <div className="become-sub">
              <h2 className="header-tag">give back</h2>
              <h1 className="sub-header">And become a mentor <em>today</em>.</h1>
              <p className="become-p" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              <Link to={"become/mentor"}>
                <button className="btn-global" type="submit"> Start Mentoring </button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}
