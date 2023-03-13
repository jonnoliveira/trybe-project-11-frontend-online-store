import React, { Component } from 'react';
import store from '../assets/store.svg';
import '../css/MiniHeader.css';

export default class MiniHeader extends Component {
  render() {
    return (
      <div className="miniHeader-container">
        <img src={ store } alt="store icon" />
        <div className="miniHeader-titles">
          <h1>front-end</h1>
          <p>online store</p>
        </div>
      </div>
    );
  }
}
