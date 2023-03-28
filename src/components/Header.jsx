import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCart from './ButtonCart';
import lupa from '../assets/lupa.svg';
import store from '../assets/store.svg';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    const { onChangeHandler, getItem, inputValue, count } = this.props;
    return (
      <header className="header-container-all">
        <div className="header-titles-img">
          <img src={ store } alt="store icon" />
          <div className="header-titles">
            <h1>front-end</h1>
            <p>online store</p>
          </div>
        </div>
        <div className="header-search-cart">
          <div className="header-inputs">
            <input
              type="text"
              value={ inputValue }
              name="inputValue"
              onChange={ onChangeHandler }
              placeholder="Digite o que você busca"
              data-testid="query-input"
              className="input-header"
            />
            <button
              type="button"
              onClick={ getItem }
              data-testid="query-button"
            >
              <img src={ lupa } alt="Lupa icon" />
            </button>
          </div>
          <div className="header-buttonCart">
            <ButtonCart count={ count } />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  inputValue: PropTypes.string.isRequired,
};
