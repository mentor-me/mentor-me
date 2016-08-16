import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import dateFormat from 'dateformat';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </div>
    );
  }
}
