import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentMethod from '../components/PaymentMethod';
import PersonalInfos from '../components/PersonalInfos';
import InvalidField from '../components/InvalidField';

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
  };

  componentDidMount() {
    if (localStorage.savedItems) {
      this.setState({
        attProducts: this.recoverLocalStorage(),
      });
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
      nomeCompleto,
      CPF,
      telefone,
      CEP,
      endereço,
      payment,
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
      localStorage.removeItem('savedItems');
      history.push('/');
    }
  };

  emailValidation = () => {
    const { email } = this.state;

    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const validation = emailPattern.test(email);

    return validation;
  };

  render() {
    const {
      attProducts,
      nomeCompleto,
      email,
      CPF,
      telefone,
      CEP,
      endereço,
      hidden,
    } = this.state;
    return (
      <div>
        <form action="">
          <fieldset>
            <h3>Revise seus produtos</h3>
            {
              attProducts.map((product) => (
                <div key={ product.title }>
                  <p data-testid="shopping-cart-product-name">
                    {product.title }
                  </p>
                  <p>
                    Valor: R$
                    { product.price }
                  </p>
                  <p>
                    Qntd:
                    { product.quantity }
                  </p>
                </div>
              ))
            }
          </fieldset>
          <fieldset>
            <h3>Informações do Comprador</h3>
            <PersonalInfos
              onChangeHandler={ this.onChangeHandler }
              nomeCompleto={ nomeCompleto }
              email={ email }
              CPF={ CPF }
              telefone={ telefone }
              CEP={ CEP }
              endereço={ endereço }
            />
          </fieldset>
          <fieldset>
            <h3>Método de Pagamento:</h3>
            <PaymentMethod
              onChangeHandler={ this.onChangeHandler }
            />
          </fieldset>
        </form>
        <button
          type="submit"
          onClick={ this.btnSubmitFunction }
          data-testid="checkout-btn"
        >
          Finalizar
        </button>
        {
          hidden === false
            && <InvalidField hidden={ hidden } />
        }
      </div>
    );
  }
}

CheckoutProducts.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
