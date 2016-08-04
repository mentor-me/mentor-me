import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from 'dateformat';

export default class ReviewEntry extends Component {
  render() {

    let { mentor, review } = this.props;
    console.log(mentor.rating)
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <span className="card-text reviewer-name"> { mentor.firstname } { mentor.lastname } </span>
            <span className="card-text review-date"> { dateFormat(review.createdAt, "mm/dd/yyyy") } </span>
            <span className="review-by pull-right" style={{"height": "20px"}}>
              <StarRatingComponent
                name={`hello${review.createdAt}`}
                value={ review.rating }
                starCount={ 5 }
                starColor={ "#d94744" }
                editing={ false }
              />
            </span>
          </div>
          <div className="card-block">
            <blockquote className="card-blockquote">
              <p>{ review.content }</p>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}
