import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome-wrapper">
        <div className="row">
          <div className="spacer50" />
          <div id="become">
          <div className="col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">

              <div className="become-sub">
            <h2 className="header-tag">give back</h2>
            <h1 className="sub-header animated fadeInUp">And become a mentor <em>today</em>.</h1>
            <p className="become-p">Continue to establish yourself as a leader in your respective field by shepharding the next generation of professionals.</p>
            <div className="btn-container">
              <Link to={"become/mentor"}>
                <button className="btn-global" > Start Mentoring </button>
              </Link>
              <Link to={"become/login"}>
                <button className="btn-global" > Login </button>
              </Link>
            </div>
            </div>
            </div>
          </div>

          <div className="container-fluid">
          <div className="row">
            <div className="callouts-header">
              <h1 className="header-tag">How It Works</h1>
            </div>
          <div id="callouts">
            <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">

              <div className="callout">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <h2>Get Started Today</h2>
                <p>Give back by signing up today and connecting with professionals looking to make strides in their careers. This is a great opportunity to feel the satisfaction of being an established professional.</p>
              </div>


            </div>
            <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">

              <div className="callout">
                <i className="fa fa-calendar-o" aria-hidden="true"></i>

                <h2>Flexible Time Commitment</h2>
                <p>Mentor Me is your one-stop shop. Use our built-in calendar system, as well as real-time chat, to schedule times that work for you.</p>
              </div>

            </div>
            <div className="col-xs-12 col-sm-12 col-md-4  col-lg-4">
              <div className="callout">
                <i className="fa fa-level-up" aria-hidden="true"></i>

                <h2>Choose the Level of Student.</h2>
                <p>Find students on our platform who you can teach, and in the process hopefully learn from as well. Our platform attracts the best and the brightest looking to make a splash in their respective industries.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div id="become_mentor_action" >
        <h1>Signing up is easy just fill out a form with your information and answer a few simple questions.</h1>
      <Link to={"become/mentor"}>
        <button className="btn-accent" > Sign Up </button>
      </Link>
      </div>

          </div>

        </div>
    );
  }
}
