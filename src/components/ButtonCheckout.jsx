import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonCheckout extends Component {
  render() {
    return (
      <Link to="/checkoutproducts">
        <button
          type="button"
          data-testid="checkout-products"
        >
          Finalizar compras

        </button>
      </Link>
    );
  }
}
