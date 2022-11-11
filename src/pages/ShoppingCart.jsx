import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  // state = {
  //   quantity: 0,
  // };

  recoverLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('savedItems'));
    return products;
  };

  incrementProduct = ({ target }) => {
    const element = target.parentNode.firstChild.innerText;
    const products = this.recoverLocalStorage();
    const inCart = products.some((product) => product.title.includes(element));

    if (inCart) {
      const index = products.findIndex((e) => e.title.includes(element));
      products[index].quantity += 1;
      // this.setState({ quantity: products[index].quantity });

      localStorage.setItem('savedItems', JSON.stringify(products));
    }
  };

  // decrementProduct = () =>{

  // }

  render() {
    const products = this.recoverLocalStorage();
    // const { quantity } = this.state;

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
                  <button
                    type="button"
                    onClick={ this.incrementProduct }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    // onClick={ this.decrementProduct }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                </div>
              ))
            )
        }
      </div>
    );
  }
}
