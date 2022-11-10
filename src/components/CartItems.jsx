import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CartItem.css';

export default class CartItems extends Component {
  render() {
    const { item } = this.props;
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
};
