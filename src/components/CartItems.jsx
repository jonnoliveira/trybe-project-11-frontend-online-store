import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CartItem.css';

export default class CartItems extends Component {
  addLocalStorage = () => {
    const { item } = this.props;
    const { title, price } = item;
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
      products.push({ title, price, quantity });
    }
    localStorage.setItem('savedItems', JSON.stringify(products));
  };

  render() {
    const { item, cartSizeCounter } = this.props;
    const { title, thumbnail, price, id } = item;
    return (
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
          Adicionar ao carrinho
        </button>
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
  }).isRequired,
  cartSizeCounter: PropTypes.func.isRequired,
};
