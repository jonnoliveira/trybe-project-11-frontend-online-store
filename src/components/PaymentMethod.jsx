import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentMethod extends Component {
  render() {
    const { onChangeHandler } = this.props;

    return (
      <div>
        <div>
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
            Boleto
          </label>
        </div>
        <div>
          <p>Cartão de Crédito</p>
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
            Visa
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
            MasterCard
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
            Elo
          </label>
        </div>
      </div>
    );
  }
}

PaymentMethod.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
};
