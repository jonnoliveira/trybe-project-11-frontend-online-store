import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  render() {
    return (
      <div data-testid="shopping-cart-empty-message">
        <p>Seu carrinho está vazio</p>
      </div>
    );
  }
}
