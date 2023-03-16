import React, { Component } from 'react';
import PropTypes from 'prop-types';
import barcode from '../assets/barcode.svg';
import visa from '../assets/visa.svg';
import elo from '../assets/elo.svg';
import mastercard from '../assets/mastercard.svg';

import '../css/PaymentMethod.css';

export default class PaymentMethod extends Component {
  render() {
    const { onChangeHandler } = this.props;

    return (
      <div className="paymentMethod-container">
        <h3>Método de Pagamento:</h3>
        <div className="paymentMethod-options-items">
          <h5>Boleto</h5>
          <label htmlFor="boleto">
            <input
              name="payment"
              id="boleto"
              type="radio"
              value="Boleto"
              required
              onChange={ onChangeHandler }
              data-testid="ticket-payment"
            />
            <img src={ barcode } alt="barcode icon" />
          </label>
        </div>
        <div className="paymentMethod-options-items">
          <h5>Cartão de Crédito</h5>
          <div className="paymentMethod-options-items-cards">
            <label htmlFor="visa">
              <input
                name="payment"
                id="visa"
                type="radio"
                value="Visa"
                required
                onChange={ onChangeHandler }
                data-testid="visa-payment"
              />
              <img src={ visa } alt="visa icon" />
            </label>
            <label htmlFor="mastercard">
              <input
                name="payment"
                id="mastercard"
                type="radio"
                value="MasterCard"
                required
                onChange={ onChangeHandler }
                data-testid="master-payment"
              />
              <img src={ mastercard } alt="mastercard icon" />
            </label>
            <label htmlFor="elo">
              <input
                name="payment"
                id="elo"
                type="radio"
                value="Elo"
                required
                onChange={ onChangeHandler }
                data-testid="elo-payment"
              />
              <img src={ elo } alt="elo icon" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

PaymentMethod.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
};
