import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { submitReview, fetchCurrentMentor } from '../../actions/learners';
import StarRatingComponent from 'react-star-rating-component';

class Review extends Component {

  componentWillUnmount(){
    this.props.fetchCurrentMentor(this.props.mentor);
  }

  constructor() {
    super();
    this.state = {
      reviewText: '',
      rating: 0
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let { reviewText, rating } = this.state;
    let data = {};
    data.content = reviewText;
    data.rating = rating;
    data.mentorId = this.props.mentor.id;
    this.props.submitReview( data )
    browserHistory.push(`/learner/${this.props.auth.username}/mentor/${this.props.mentor.username}/profile`)
  }

  onStarClick(value) {
    this.setState({rating: value});
  }

  handleReviewChange(e) {
    this.setState({ reviewText: e.target.value });
  }

  render() {

    const { mentor } = this.props;
    const { rating } = this.state;

      return (
        <div className="spacer30">
          <div className="container-fluid learner">
            <div className="row">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title"> Leave { mentor.firstname } { mentor.lastname } a review </h4>
                  <div className="card-text">
                    <form onSubmit={this.handleFormSubmit} >
                      <div className="form-group review-form">
                        <StarRatingComponent
                          name="rate2"
                          starColor={"#d94744"}
                          starCount={5}
                          value={rating}
                          onStarClick={this.onStarClick}
                        />
                      </div>
                      <div className="form-group">
                        <textarea style={{"width": "100%"}} rows="6" className="form-control" onChange={this.handleReviewChange} placeholder="Write review here..." />
                      </div>
                      <button className="btn-global" type="submit"> Submit Review </button>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    auth: state.auth.currentUser,
    mentor: state.learner.currentMentor
  };
}

export default connect(mapStateToProps, { submitReview, fetchCurrentMentor })(Review);
