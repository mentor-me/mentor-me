import React, { Component } from 'react';
import Navbar from './Navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container" style={{
          'paddingTop': '70px',
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
