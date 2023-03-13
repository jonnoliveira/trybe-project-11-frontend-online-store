import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/ButtonCheckout.css';

export default class ButtonCheckout extends Component {
  render() {
    return (
      <Link to="/checkoutproducts">
        <button
          type="button"
          data-testid="checkout-products"
          className="buttonCheckout"
        >
          Finalizar compras
        </button>
      </Link>
    );
  }
}
