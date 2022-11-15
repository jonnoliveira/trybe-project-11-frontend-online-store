import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ButtonCart extends Component {
  render() {
    const { count } = this.props;
    return (
      <Link to="/shoppingcart">
        <button
          type="button"
          data-testid="shopping-cart-button"
        >
          Carrinho
          <p data-testid="shopping-cart-size">{ count }</p>
        </button>
      </Link>
    );
  }
}

ButtonCart.propTypes = {
  count: PropTypes.number.isRequired,
};
