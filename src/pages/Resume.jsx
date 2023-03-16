import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MiniHeader from '../components/MiniHeader';
import Loading from '../components/Loading';
import resumeImg from '../assets/resume.svg';
import homepage from '../assets/homepage.svg';
import '../css/Resume.css';

export default class Resume extends Component {
  state = {
    attProducts: [],
    CEP: '',
    CPF: '',
    endereco: '',
    nomeCompleto: '',
    payment: '',
    telefone: '',
    total: 0,
  };

  componentDidMount() {
    if (localStorage.resume) {
      this.recoveryLocalStorage();
    }
  }

  recoveryLocalStorage = () => {
    const resume = JSON.parse(localStorage.getItem('resume'));
    const { attProducts, CEP, CPF, endereco, nomeCompleto, payment, telefone,
      total } = resume[0];
    this.setState({ attProducts,
      CEP,
      CPF,
      endereco,
      nomeCompleto,
      payment,
      telefone,
      total });
  };

  homeBtn = () => {
    const { history } = this.props;

    localStorage.clear();
    history.push('/');
  };

  render() {
    const { attProducts, CEP, CPF, endereco, nomeCompleto, payment, telefone,
      total } = this.state;
    return (
      <div>
        <MiniHeader />
        {
          attProducts.length === 0
            ? (
              <Loading />
            )
            : (
              <div className="resume-container">
                <div className="resume-img-title">
                  <img src={ resumeImg } alt="resume icon" />
                  <h1>Resumo da compra</h1>
                </div>
                <div className="resume-products-container">
                  {
                    attProducts.map(({ title, price }) => (
                      <div key={ title } className="resume-products-list">
                        <h5>{title}</h5>
                        <p>{`R$ ${price}`}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="resume-info-container">
                  <div className="resume-info">
                    <h5>Nome Completo:</h5>
                    <p>{nomeCompleto}</p>
                  </div>
                  <div className="resume-info">
                    <h5>Telefone: </h5>
                    <p>{telefone}</p>
                  </div>
                  <div className="resume-info">
                    <h5>CPF:</h5>
                    <p>{CPF}</p>
                  </div>
                  <div className="resume-info">
                    <h5>Endereço:</h5>
                    <p>{endereco}</p>
                  </div>
                  <div className="resume-info">
                    <h5>CEP:</h5>
                    <p>{CEP}</p>
                  </div>
                </div>
                <div className="resume-value-container">
                  <div className="resume-value">
                    <h5>Valor Pago:</h5>
                    <p>{ `R$ ${total.toFixed(2)}` }</p>
                  </div>
                </div>
                {
                  payment !== 'Boleto'
                    ? (
                      <div className="resume-payment">

                        <h5>Cartão de Crédito:</h5>
                        <p>{ payment }</p>
                      </div>
                    )
                    : (
                      <div className="resume-payment">
                        <p>{ payment }</p>
                      </div>
                    )
                }
                <button
                  type="button"
                  onClick={ () => this.homeBtn() }
                  className="resume-btn-home"
                >
                  <img src={ homepage } alt="" />
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

Resume.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
