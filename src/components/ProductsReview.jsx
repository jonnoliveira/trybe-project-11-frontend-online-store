import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cross from '../assets/cross.svg';
import priceImg from '../assets/price.svg';
import '../css/ProductsReview.css';

export default class ProductsReview extends Component {
  render() {
    const { attProducts, removeItem, total } = this.props;
    return (
      <div className="productsReview-container">
        <h3>Revise seus produtos</h3>
        {
          attProducts.map(({ title, price, quantity, thumbnail }) => (
            <div key={ title } className="productsReview-card">
              <button type="button" onClick={ removeItem } name={ title }>
                <img src={ cross } alt="Fechar icon" />
              </button>
              <div className="productsReview-img-title">
                <img src={ thumbnail } alt={ `${title} thumb` } />
                <h4 data-testid="shopping-cart-product-name">
                  {title }
                </h4>
              </div>
              <div className="productsReview-qnt-price">
                <h4>
                  Qntd:
                  {' '}
                  { quantity }
                </h4>
                <h4>
                  Valor: R$
                  { price.toFixed(2) }
                </h4>
              </div>
            </div>
          ))
        }
        <div className="productsReview-totalPrice">
          <h3>Preço total:</h3>
          <p>{ `R$ ${total.toFixed(2)}` }</p>
          <img src={ priceImg } alt="price icon" />
        </div>
      </div>
    );
  }
}

ProductsReview.propTypes = {
  attProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeItem: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
