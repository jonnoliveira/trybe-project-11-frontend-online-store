import React, { Component } from 'react';
import ButtonCheckout from '../components/ButtonCheckout';
import MiniHeader from '../components/MiniHeader';
import '../css/ShoppingCart.css';
import shopCart from '../assets/shopCart.svg';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import emptyCart from '../assets/empty-cart.svg';
import BtnBack from '../components/BtnBack';

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
      const itemPrice = attProducts[index].price;
      if (attProducts[index].quantity < attProducts[index].availableQuantity) {
        attProducts[index].quantity += 1;
        attProducts[index].price = itemPrice * attProducts[index].quantity;
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
      const itemPrice = attProducts[index].price;
      attProducts[index].price = itemPrice / attProducts[index].quantity;

      if (attProducts[index].quantity === 1) {
        return 1; // QUANTIDADE MINIMA NO CARRINHO
      }
      attProducts[index].quantity -= 1;
    }
    localStorage.setItem('savedItems', JSON.stringify(attProducts));
    this.setState({ attProducts });
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
    console.log(attProducts);
    return (
      <div className="shoppingCart-container">
        <MiniHeader />
        <div className="shoppingCart-container-title-img">
          <h1>Meu carrinho</h1>
          <img src={ shopCart } alt="Shopcart icon" />
        </div>
        <div className="productsDetails-btnBack">
          <BtnBack props={ this.props } />
        </div>
        {
          attProducts.length
            ? (
              <div className="shoppingCart-products-container">
                {
                  attProducts.map((product) => (
                    <div key={ product.title } className="shoppingCart-product-item">
                      <div className="shoppingCart-product-img-name">
                        <img src={ product.thumbnail } alt={ product.title } />
                        <p data-testid="shopping-cart-product-name">
                          {product.title }
                        </p>
                      </div>
                      <p className="shoppingCart-product-price">
                        { `R$ ${product.price.toFixed(2)}` }
                      </p>
                      <div className="shoppingCart-product-quantity">
                        <p data-testid="shopping-cart-product-quantity">
                          { `Quantidade: ${product.quantity}` }
                        </p>
                        <div className="shoppingCart-product-quantity-btns">
                          <button
                            type="button"
                            onClick={ () => { this.decrementProduct(product.title); } }
                            data-testid="product-decrease-quantity"
                          >
                            <img src={ minus } alt="Minus icon" />
                          </button>
                          <button
                            type="button"
                            onClick={ () => { this.incrementProduct(product.title); } }
                            data-testid="product-increase-quantity"
                          >
                            <img src={ plus } alt="Plus icon" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={ () => { this.removeLocalStorage(product.title); } }
                        data-testid="remove-product"
                        className="shoppingCart-product-removeBtn"
                      >
                        Remover
                      </button>
                    </div>
                  ))
                }
                <div className="shoppingCart-btnCheckout-container">
                  <ButtonCheckout />
                </div>
              </div>
            )
            : (
              <div
                data-testid="shopping-cart-empty-message"
                className="shoppingCart-empty-container"
              >
                <img src={ emptyCart } alt="Empty cart icon" />
                <h4>
                  Seu carrinho está vazio!
                </h4>
              </div>
            )
        }
      </div>
    );
  }
}
