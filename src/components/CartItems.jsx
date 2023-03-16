import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fshipping from '../assets/fshipping.svg';
import shopCart from '../assets/shopCart.svg';
import '../css/CartItem.css';

export default class CartItems extends Component {
  state = {
    item: '',
  };

  componentDidMount() {
    this.ifItemPriceNull();
  }

  ifItemPriceNull = () => {
    const { item } = this.props;
    const { price } = item;
    if (price === null) item.price = 0;

    this.setState({ item });
  };

  addLocalStorage = () => {
    const { item } = this.state;
    const { title, price, available_quantity: availableQuantity, thumbnail } = item;
    let products = [];
    const quantity = 1;

    if (localStorage.getItem('savedItems')) {
      products = JSON.parse(localStorage.getItem('savedItems'));
    }

    const inCart = products.find((product) => product.title === title);
    if (inCart) {
      const index = products.findIndex((e) => e.title === title);
      products[index].quantity += 1;
      const newPrice = products[index].quantity * products[index].price;
      products[index].price = newPrice;
    } else {
      products.push({ title, price, quantity, availableQuantity, thumbnail });
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
          price !== null
              && (
                <div className="cartItem-container">
                  {
                    freeShipping
                      ? (
                        <div data-testid="product" className="cartItem-products">
                          <Link
                            to={ `/productdetails/${id}` }
                            data-testid="product-detail-link"
                          >
                            <div className="cartItem-products-img-title">
                              <img src={ thumbnail } alt={ title } />
                              <h3>
                                { title }
                              </h3>
                            </div>
                            <div className="cartItem-products-free-shipping">
                              <img src={ fshipping } alt="Free shipping icon" />
                              <h2 data-testid="free-shipping">FRETE GRÁTIS</h2>
                            </div>
                            <h4>
                              { `R$ ${price.toFixed(2)}` }
                            </h4>
                          </Link>
                          <button
                            type="button"
                            data-testid="product-add-to-cart"
                            onClick={ () => {
                              this.addLocalStorage();
                              cartSizeCounter();
                            } }
                            className="cartItem-products-btn-addCart"
                          >
                            Adicionar ao carrinho
                            <img src={ shopCart } alt="Shopcart icon" />
                          </button>
                        </div>
                      )
                      : (
                        <div data-testid="product" className="cartItem-products">
                          <Link
                            to={ `/productdetails/${id}` }
                            data-testid="product-detail-link"
                          >
                            <div className="cartItem-products-img-title">
                              <img src={ thumbnail } alt={ title } />
                              <h3>
                                { title }
                              </h3>
                            </div>
                            <h4>
                              { `R$ ${price.toFixed(2)}` }
                            </h4>
                          </Link>
                          <button
                            type="button"
                            data-testid="product-add-to-cart"
                            onClick={ () => {
                              this.addLocalStorage();
                              cartSizeCounter();
                            } }
                            className="cartItem-products-btn-addCart"
                          >
                            Adicionar ao carrinho
                            <img src={ shopCart } alt="Shopcart icon" />
                          </button>
                        </div>
                      )
                  }
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
