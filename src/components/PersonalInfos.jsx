import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/PersonalInfos.css';

export default class PersonalInfos extends Component {
  render() {
    const {
      onChangeHandler,
      nomeCompleto,
      email,
      CPF,
      telefone,
      CEP,
      endereço,
    } = this.props;

    return (
      <div className="personalInfos-container">
        <h3>Informações do Comprador</h3>
        <label htmlFor="nomeCompleto">
          <input
            type="text"
            name="nomeCompleto"
            id="nomeCompleto"
            placeholder="Nome Completo"
            value={ nomeCompleto }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={ email }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-email"
          />
        </label>
        <label htmlFor="CPF">
          <input
            type="text"
            name="CPF"
            id="CPF"
            placeholder="CPF"
            value={ CPF }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-cpf"
          />
        </label>
        <label htmlFor="telefone">
          <input
            type="number"
            name="telefone"
            id="telefone"
            placeholder="Telefone"
            value={ telefone }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="CEP">
          <input
            type="text"
            name="CEP"
            id="CEP"
            placeholder="CEP"
            value={ CEP }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-cep"
          />
        </label>
        <label htmlFor="endereço">
          <input
            type="text"
            name="endereço"
            id="endereço"
            placeholder="Endereço"
            value={ endereço }
            required
            onChange={ onChangeHandler }
            data-testid="checkout-address"
          />
        </label>
      </div>
    );
  }
}

PersonalInfos.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  nomeCompleto: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  CPF: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  CEP: PropTypes.string.isRequired,
  endereço: PropTypes.string.isRequired,
};
