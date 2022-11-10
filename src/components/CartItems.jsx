import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartItems extends Component {
  render() {
    const { item } = this.props;
    const { title, thumbnail, price } = item;
    return (
      <li data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>
          { title }
        </h3>
        <h4>
          { price }
        </h4>
      </li>
    );
  }
}

CartItems.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};