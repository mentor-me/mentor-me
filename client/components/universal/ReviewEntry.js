import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from 'dateformat';

export default class ReviewEntry extends Component {
  render() {
    let { mentor, review } = this.props;
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <span className="card-text review-date"> { dateFormat(review.createdAt, "m/dd/yyyy") } </span>
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
            <div className="card-text">{ review.content }</div>
          </div>
        </div>
      </div>
    );
  }
}
