import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shopCart from '../assets/shopCart.svg';
import '../css/ButtonCart.css';

export default class ButtonCart extends Component {
  render() {
    const { count } = this.props;
    return (
      <Link to="/shoppingcart">
        <button
          type="button"
          data-testid="shopping-cart-button"
          className="ButtonCart-container"
        >
          <img src={ shopCart } alt="Cart icon" />
          <p data-testid="shopping-cart-size" className="ButtonCart-counter">{ count }</p>
        </button>
      </Link>
    );
  }
}

ButtonCart.propTypes = {
  count: PropTypes.number.isRequired,
};
