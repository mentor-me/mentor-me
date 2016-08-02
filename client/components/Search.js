import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newSearchQuery } from '../actions/learners';

import _ from 'underscore';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.filterMentors = _.debounce(this.filterMentors, 600);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value,
    });
    this.filterMentors();
  }

  filterMentors() {
    this.props.newSearchQuery(this.state.query);
  }

  render() {
    return (
        <input className="form-control" type="text" onChange={this.handleQueryChange.bind(this)} placeholder="Search for a mentor..." />
    );
  }
}

export default connect(null, { newSearchQuery })(Search);
