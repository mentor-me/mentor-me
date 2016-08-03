import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
      <div className="container-fluid welcome">
        <form action="/auth/linkedin" method="get">
          <input type="submit" value="LinkedIn" name="Submit" className="btn-global" />
        </form>
      </div>
    );
  }
}
