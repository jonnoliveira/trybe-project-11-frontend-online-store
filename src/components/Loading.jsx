import React, { Component } from 'react';
import '../css/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
