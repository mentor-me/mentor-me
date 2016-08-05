import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from 'dateformat';

export default class ReviewEntry extends Component {
  render() {
    let { mentor, review } = this.props;
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-block">
              <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          </div>
        </div>
      </div>
    );
  }
}
