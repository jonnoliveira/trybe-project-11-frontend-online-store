import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonCart extends Component {
  render() {
    return (
      <Link to="/shoppingcart">
        <button
          type="button"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </button>
      </Link>
    );
  }
}
