import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ButtonCart from '../components/ButtonCart';
import FormProductDetails from '../components/FormProductDetails';
import InvalidField from '../components/InvalidField';
import AddComents from '../components/AddComents';

export default class ProductDetails extends Component {
  constructor() {
    super();

    this.getProduct = this.getProduct.bind(this);
  }

  state = {
    productObj: [],
    email: '',
    text: '',
    isDisabled: false,
    productLS: [],
    hidden: true,
    count: 0,
  };

  componentDidMount() {
    this.getProduct();

    const { match: { params: { id } } } = this.props;

    if (localStorage[id]) {
      const recoverProducts = JSON.parse(localStorage.getItem(`${id}`));
      this.setState({
        productLS: recoverProducts,
      });
    }
    this.cartSizeCounter();
  }

  cartSizeCounter = () => {
    if (localStorage.savedItems) {
      const recoverProducts = JSON.parse(localStorage.getItem('savedItems'));
      const arrayOfQuantitys = recoverProducts.map((product) => product.quantity);
      const sum = arrayOfQuantitys.reduce((acc, curr) => acc + curr);
      this.setState({ count: sum });
    }
  };

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ productObj: product });
  };

  addLocalStorage = () => {
    const { productObj } = this.state;
    const { title, price, available_quantity: availableQuantity } = productObj;

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
    this.cartSizeCounter();
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({
      [name]: value,
    });
  };

  emailValidation = () => {
    const { email } = this.state;

    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const validation = emailPattern.test(email);

    return validation;
  };

  btnSubmitFunction = (event) => {
    event.preventDefault();

    const {
      rating,
      email,
      text,
    } = this.state;

    const emailValidation = this.emailValidation();
    let avaliations = [];

    if (localStorage.getItem('avaliations')) {
      avaliations = JSON.parse(localStorage.getItem('avaliations'));
    }

    if (rating === undefined || email.length === 0 || emailValidation === false) {
      this.setState({ hidden: false });
    } else {
      avaliations.push({ email, rating, text });

      this.setState({
        hidden: true,
        email: '',
        rating: '',
        text: '',
        productLS: avaliations,
      });
    }
    localStorage.setItem('avaliations', JSON.stringify(avaliations));
  };

  render() {
    const {
      productObj,
      email,
      text,
      isDisabled,
      productLS,
      hidden,
      count,
    } = this.state;
    const { thumbnail, title, price } = productObj;
    return (
      <div data-testid="product" className="productsAndComents">
        <div className="products-details">
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
          <ButtonCart count={ count } data-testid="shopping-cart-button" />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addLocalStorage }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <FormProductDetails
          email={ email }
          text={ text }
          btnSubmitFunction={ this.btnSubmitFunction }
          onChangeHandler={ this.onChangeHandler }
          isDisabled={ isDisabled }
        />
        {
          hidden === false
            && <InvalidField hidden={ hidden } />
        }
        <div>
          <h3>Avaliações</h3>
          <div>
            {
              hidden === true && (
                productLS.map((product, index) => (
                  <AddComents
                    email={ product.email }
                    rating={ product.rating }
                    text={ product.text }
                    key={ index }
                  />
                )))
            }
          </div>
        </div>
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
