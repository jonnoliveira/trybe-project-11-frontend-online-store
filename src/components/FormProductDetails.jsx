import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/FormProductDetails.css';

export default class FormProductDetails extends Component {
  render() {
    const {
      email,
      onChangeHandler,
      btnSubmitFunction,
      text,
      isDisabled,
    } = this.props;

    return (
      <form action="" className="formProductDetails-container">
        <div className="formProductDetails-email">
          <label htmlFor="email-form-product-details">
            *Email:
            {' '}
            <input
              type="email"
              name="email"
              value={ email }
              id="email-form-product-details"
              required
              onChange={ onChangeHandler }
              data-testid="product-detail-email"
              placeholder="Digite seu email"
            />
          </label>
        </div>
        <div className="formProductDetails-rating">
          <p>*Avaliação do Produto:</p>
          <label htmlFor="rating-1-form-product-details">
            <input
              name="rating"
              id="rating-1-form-product-details"
              type="radio"
              value="1"
              required
              onClick={ onChangeHandler }
              data-testid="1-rating"
              className="formProductDetails-ratin-inputRadio"
            />
            1
          </label>
          <label htmlFor="rating-2-form-product-details">
            <input
              name="rating"
              id="rating-2-form-product-details"
              type="radio"
              value="2"
              required
              onClick={ onChangeHandler }
              data-testid="2-rating"
              className="formProductDetails-ratin-inputRadio"
            />
            2
          </label>
          <label htmlFor="rating-3-form-product-details">
            <input
              name="rating"
              id="rating-3-form-product-details"
              type="radio"
              value="3"
              required
              onClick={ onChangeHandler }
              data-testid="3-rating"
              className="formProductDetails-ratin-inputRadio"
            />
            3
          </label>
          <label htmlFor="rating-4-form-product-details">
            <input
              name="rating"
              id="rating-4-form-product-details"
              type="radio"
              value="4"
              required
              onClick={ onChangeHandler }
              data-testid="4-rating"
              className="formProductDetails-ratin-inputRadio"
            />
            4
          </label>
          <label htmlFor="rating-5-form-product-details">
            <input
              name="rating"
              id="rating-5-form-product-details"
              type="radio"
              value="5"
              required
              onClick={ onChangeHandler }
              data-testid="5-rating"
              className="formProductDetails-ratin-inputRadio"
            />
            5
          </label>
        </div>
        <div className="formProductDetails-coments">
          <label htmlFor="coments-form-product-details">
            *Comentários:
            <textarea
              name="text"
              value={ text }
              id="coments-form-product-details"
              onChange={ onChangeHandler }
              data-testid="product-detail-evaluation"
              placeholder="Comente aqui sua avaliação sobre o produto."
            />
          </label>
        </div>
        {
          isDisabled
            && <div className="formProductDetails-alert">*Campos obrigatórios</div>
        }
        <button
          type="button"
          onClick={ btnSubmitFunction }
          disabled={ isDisabled }
          data-testid="submit-review-btn"
        >
          Enviar
        </button>
      </form>
    );
  }
}

FormProductDetails.propTypes = {
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  btnSubmitFunction: PropTypes.func.isRequired,
};
