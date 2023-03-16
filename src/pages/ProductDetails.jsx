import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ButtonCart from '../components/ButtonCart';
import FormProductDetails from '../components/FormProductDetails';
import AddComents from '../components/AddComents';
import BtnBack from '../components/BtnBack';
import '../css/ProductDetails.css';
import MiniHeader from '../components/MiniHeader';
import ratingImg from '../assets/rating.svg';

const NUMBER_FIVE = 5;

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.getProduct = this.getProduct.bind(this);
  }

  state = {
    productObj: [],
    rating: '',
    email: '',
    text: '',
    isDisabled: true,
    productLS: [],
    hidden: true,
    count: 0,
    isOpen: false,
    isOpenAval: false,
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
    }, () => {
      const { rating, email, text } = this.state;
      const emailValidation = this.emailValidation();
      if (rating === '' || email.length === 0 || emailValidation === false
      || text.length <= NUMBER_FIVE) {
        this.setState({ hidden: false, isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    });
  };

  emailValidation = () => {
    const { email } = this.state;
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const validation = emailPattern.test(email);
    return validation;
  };

  btnSubmitFunction = () => {
    const {
      email, rating, text,
    } = this.state;
    let avaliations = [];
    if (localStorage.getItem('avaliations')) {
      avaliations = JSON.parse(localStorage.getItem('avaliations'));
    }
    avaliations.push({ email, rating, text });
    this.setState({ hidden: true, email: '', rating: '', text: '', productLS: avaliations,
    });
    localStorage.setItem('avaliations', JSON.stringify(avaliations));
  };

  openSpecifications = () => {
    const { isOpen } = this.state;
    if (isOpen === true) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  };

  openAval = () => {
    const { isOpenAval } = this.state;
    if (isOpenAval === true) {
      this.setState({ isOpenAval: false });
    } else {
      this.setState({ isOpenAval: true });
    }
  };

  render() {
    const {
      productObj, email, text, isDisabled, productLS,
      hidden, count, isOpen, isOpenAval,
    } = this.state;
    const { thumbnail, title, price, attributes } = productObj;
    return (
      <div data-testid="product" className="productsDetails-container">
        <MiniHeader />
        {
          productObj.length !== 0
            && (
              <div className="productsDetails-card">
                <div className="productsDetails-card-items">
                  <div className="productsDetails-img-title-price-btn">
                    <div className="productsDetails-img-title">
                      <img
                        src={ thumbnail }
                        alt={ title }
                        data-testid="product-detail-image"
                      />
                      <h3 data-testid="product-detail-name">
                        { title }
                      </h3>
                    </div>
                    <h4 data-testid="product-detail-price">
                      { `R$ ${price}` }
                    </h4>
                    <button
                      type="button"
                      data-testid="product-detail-add-to-cart"
                      onClick={ this.addLocalStorage }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                  <div className="productsDetails-btnBack">
                    <BtnBack props={ this.props } />
                  </div>
                  <div className="productsDetails-btnCart-especifications">
                    <button
                      type="button"
                      onClick={ this.openSpecifications }
                    >
                      especificações técnicas
                    </button>
                    <ButtonCart count={ count } data-testid="shopping-cart-button" />
                  </div>
                  {
                    isOpen
                    && (
                      <ul className="productsDetails-list">
                        {
                          attributes.map((atrib) => (
                            <li key={ atrib.name }>
                              <h5>{ `${atrib.name}:` }</h5>
                              <p>{atrib.value_name}</p>
                            </li>
                          ))
                        }
                      </ul>
                    )
                  }
                </div>
                <div className="productsDetails-btnCart-avaliations">
                  <button type="button" onClick={ this.openAval }>
                    Deixe sua avaliação
                    <img src={ ratingImg } alt="rating icon" />
                  </button>
                </div>
                {
                  isOpenAval
                    && (
                      <FormProductDetails
                        email={ email }
                        text={ text }
                        btnSubmitFunction={ this.btnSubmitFunction }
                        onChangeHandler={ this.onChangeHandler }
                        isDisabled={ isDisabled }
                      />
                    )
                }
                <div className="productsDetails-avaliations-container">
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
            )
        }
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
