import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ButtonCart from '../components/ButtonCart';

export default class ProductDetails extends Component {
  constructor() {
    super();

    this.getProduct = this.getProduct.bind(this);
  }

  state = {
    productObj: [],
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ productObj: product });
  };

  addLocalStorage = () => {
    const { productObj } = this.state;
    const { title, price } = productObj;
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
    const { productObj } = this.state;
    const { thumbnail, title, price } = productObj;

    return (
      <div data-testid="product" className="products">
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <h3 data-testid="product-detail-name">
          { title }
        </h3>
        <h3 data-testid="product-detail-price">
          { price }
        </h3>
        <p>
          FALTA ATRIBUTOS
        </p>
        <ButtonCart data-testid="shopping-cart-button" />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addLocalStorage }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
