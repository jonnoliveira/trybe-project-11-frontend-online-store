import React, { Component } from 'react';
import ButtonCheckout from '../components/ButtonCheckout';

export default class ShoppingCart extends Component {
  state = {
    attProducts: [],
  };

  componentDidMount() {
    if (localStorage.savedItems) {
      this.setState({
        attProducts: this.recoverLocalStorage(),
      });
    }
  }

  recoverLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('savedItems'));
    return products;
  };

  incrementProduct = (title) => {
    const { attProducts } = this.state;

    const inCart = attProducts.some((product) => product.title.includes(title));

    if (inCart) {
      const index = attProducts.findIndex((e) => e.title.includes(title));
      if (attProducts[index].quantity < attProducts[index].availableQuantity) {
        attProducts[index].quantity += 1;
      }

      localStorage.setItem('savedItems', JSON.stringify(attProducts));

      this.setState({ attProducts });
    }
  };

  decrementProduct = (title) => {
    const { attProducts } = this.state;

    const inCart = attProducts.some((product) => product.title.includes(title));
    if (inCart) {
      const index = attProducts.findIndex((e) => e.title.includes(title));
      if (attProducts[index].quantity === 1) return 1; // QUANTIDADE MINIMA NO CARRINHO

      attProducts[index].quantity -= 1;

      localStorage.setItem('savedItems', JSON.stringify(attProducts));
      this.setState({ attProducts });
    }
  };

  removeLocalStorage = (title) => {
    const { attProducts } = this.state;

    const newArrItems = attProducts.filter((product) => product.title !== title);

    localStorage.setItem('savedItems', JSON.stringify(newArrItems));

    if (newArrItems.length === 0) {
      localStorage.removeItem('savedItems');
    }

    this.setState({ attProducts: newArrItems });
  };

  render() {
    const { attProducts } = this.state;
    return (
      <div>
        <div>
          {
            attProducts.length
              ? (
                attProducts.map((product) => (
                  <div key={ product.title }>
                    <p data-testid="shopping-cart-product-name">
                      {product.title }
                    </p>
                    <p>
                      Preço: R$
                      { product.price }
                    </p>
                    <p data-testid="shopping-cart-product-quantity">
                      Qntd:
                      { product.quantity }
                    </p>
                    <button
                      type="button"
                      onClick={ () => { this.decrementProduct(product.title); } }
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={ () => { this.incrementProduct(product.title); } }
                      data-testid="product-increase-quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={ () => { this.removeLocalStorage(product.title); } }
                      data-testid="remove-product"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )
              : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          }
        </div>
        <ButtonCheckout />
      </div>
    );
  }
}
