import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/CartItem.css';

export default class CartItems extends Component {
  addLocalStorage = () => {
    const { item } = this.props;
    const { title, price, available_quantity: availableQuantity } = item;
    let products = [];
    const quantity = 1;

    if (localStorage.getItem('savedItems')) {
      products = JSON.parse(localStorage.getItem('savedItems'));
    }

    const inCart = products.find((product) => product.title === title);
    if (inCart) {
      const index = products.findIndex((e) => e.title === title);
      products[index].quantity += 1;
    } else {
      products.push({ title, price, quantity, availableQuantity });
    }
    localStorage.setItem('savedItems', JSON.stringify(products));
  };

  render() {
    const { item, cartSizeCounter } = this.props;
    const {
      title,
      thumbnail,
      price,
      id,
      shipping: { free_shipping: freeShipping },
    } = item;
    return (
      <div>
        {
          freeShipping
            ? (
              <div data-testid="product" className="products">
                <Link
                  to={ `/productdetails/${id}` }
                  data-testid="product-detail-link"
                >
                  <img src={ thumbnail } alt={ title } />
                  <h3>
                    { title }
                  </h3>
                  <h2 data-testid="free-shipping">FRETE GRÁTIS</h2>
                  <h4>
                    { price }
                  </h4>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => {
                    this.addLocalStorage();
                    cartSizeCounter();
                  } }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            )
            : (
              <div data-testid="product" className="products">
                <Link
                  to={ `/productdetails/${id}` }
                  data-testid="product-detail-link"
                >
                  <img src={ thumbnail } alt={ title } />
                  <h3>
                    { title }
                  </h3>
                  <h4>
                    { price }
                  </h4>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => {
                    this.addLocalStorage();
                    cartSizeCounter();
                  } }
                >
                  Adicionar ao carrinho;
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

CartItems.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
    available_quantity: PropTypes.number,
    shipping: PropTypes.instanceOf(Object),
  }).isRequired,
  cartSizeCounter: PropTypes.func,

};

CartItems.defaultProps = {
  cartSizeCounter: PropTypes.func,
};
