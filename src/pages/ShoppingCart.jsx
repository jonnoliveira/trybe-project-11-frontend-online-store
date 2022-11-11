import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  recoverLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('savedItems'));
    return products;
  };

  render() {
    const products = this.recoverLocalStorage();

    return (
      <div>
        {
          localStorage.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              products.map((product) => (
                <div key={ product.title }>
                  <p data-testid="shopping-cart-product-name">
                    {product.title }
                  </p>
                  <p>
                    { product.price }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    { product.quantity }
                  </p>
                </div>
              ))
            )
        }
      </div>
    );
  }
}
