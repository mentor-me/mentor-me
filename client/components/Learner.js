import React, { Component } from 'react';

export default class Learner extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
