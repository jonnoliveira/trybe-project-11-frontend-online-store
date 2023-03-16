import React, { Component } from 'react';
import PropTypes from 'prop-types';
import back from '../assets/backBtn.svg';
import '../css/BtnBack.css';

export default class BtnBack extends Component {
  backPage = () => {
    const { props } = this.props;
    props.history.goBack();
  };

  render() {
    return (
      <button
        type="button"
        onClick={ () => this.backPage() }
        className="btnBack-container"
      >
        <img src={ back } alt="back button icon" />
        <img src={ back } alt="back button icon" />
        <img src={ back } alt="back button icon" />
      </button>
    );
  }
}

BtnBack.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }),
  }).isRequired,
};
