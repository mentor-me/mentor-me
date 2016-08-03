import React, { Component } from 'react';

export default class SkillPill extends Component {
  render() {
    return (
      <span className="expertise">
        {this.props.skill}
      </span>
    );
  }
}
