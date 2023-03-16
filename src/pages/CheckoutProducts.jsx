import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentMethod from '../components/PaymentMethod';
import PersonalInfos from '../components/PersonalInfos';
import InvalidField from '../components/InvalidField';
import ProductsReview from '../components/ProductsReview';
import MiniHeader from '../components/MiniHeader';
import '../css/CheckoutProducts.css';
import BtnBack from '../components/BtnBack';

export default class CheckoutProducts extends Component {
  state = {
    attProducts: [],
    nomeCompleto: '',
    email: '',
    CPF: '',
    telefone: '',
    CEP: '',
    endereço: '',
    hidden: true,
    total: 0,
  };

  componentDidMount() {
    if (localStorage.savedItems) {
      this.setState({
        attProducts: this.recoverLocalStorage(),
      }, () => this.totalCost());
    }
  }

  recoverLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('savedItems'));
    return products;
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

  btnSubmitFunction = (event) => {
    event.preventDefault();

    const {
      attProducts, nomeCompleto, CPF, telefone, CEP, endereço, payment, total,
    } = this.state;
    const { history } = this.props;

    const emailValidation = this.emailValidation();

    // ATENTAR ÀS VALIDAÇÕES: APRIMORAR CÓDIGO VALIDANDO CPF/TELEFONE/CEP
    if (nomeCompleto.length === 0 || emailValidation === false || CPF.length === 0
      || telefone.length === 0 || CEP.length === 0
      || endereço.length === 0 || payment === undefined) {
      this.setState({ hidden: false });
    } else {
      this.setState({
        hidden: true,
      });
      const resume = [{
        attProducts, nomeCompleto, CPF, telefone, CEP, endereço, payment, total,
      }];
      localStorage.setItem('resume', JSON.stringify(resume));
      history.push('/resume');
    }
  };

  emailValidation = () => {
    const { email } = this.state;

    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const validation = emailPattern.test(email);

    return validation;
  };

  removeItem = ({ target }) => {
    const { attProducts } = this.state;
    const { name } = target;
    const newArray = attProducts.filter((p) => p.title !== name);
    localStorage.setItem('savedItems', JSON.stringify(newArray));
    this.setState({ attProducts: newArray }, () => this.totalCost());
  };

  totalCost = () => {
    const { attProducts } = this.state;
    if (attProducts.length === 0) localStorage.clear();

    const total = attProducts.reduce((acc, curr) => acc + curr.price, 0);
    this.setState({ total });
  };

  render() {
    const {
      attProducts, nomeCompleto, email, CPF, telefone, CEP, endereço, hidden, total,
    } = this.state;
    return (
      <div className="checkoutProducts-container">
        <MiniHeader />
        <div className="productsDetails-btnBack">
          <BtnBack props={ this.props } />
        </div>
        <form action="" className="checkoutProducts-form">
          <ProductsReview
            attProducts={ attProducts }
            removeItem={ this.removeItem }
            total={ total }
          />
          <PersonalInfos
            onChangeHandler={ this.onChangeHandler }
            nomeCompleto={ nomeCompleto }
            email={ email }
            CPF={ CPF }
            telefone={ telefone }
            CEP={ CEP }
            endereço={ endereço }
          />
          <PaymentMethod
            onChangeHandler={ this.onChangeHandler }
          />
        </form>
        {
          hidden === false
            && <InvalidField hidden={ hidden } />
        }
        <div className="checkoutProducts-btn-submit-container">
          <button
            type="submit"
            onClick={ this.btnSubmitFunction }
            data-testid="checkout-btn"
            className="checkoutProducts-btn-submit"
          >
            Finalizar
          </button>
        </div>
      </div>
    );
  }
}

CheckoutProducts.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
