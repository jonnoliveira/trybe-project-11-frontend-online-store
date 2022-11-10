import React, { Component } from 'react';
import ButtonCart from '../components/ButtonCart';
import SidebarCategories from './SidebarCategories';
// import { getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductsList extends Component {
  state = {
    inputValue: '',
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

  getItem = async () => {
    const { inputValue } = this.state;

    // const search = await getProductsFromCategoryAndQuery(inputValue);
    // console.log(search);
    const url = fetch(`https://api.mercadolibre.com/sites/MLB/${inputValue}`);
    const response = (await url).json();
    const data = await response;
    console.log(data);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <div data-testid="home-initial-message">
          <input
            type="text"
            value={ inputValue }
            name="inputValue"
            onChange={ this.onChangeHandler }
            data-testid="query-input"
          />
          <button
            type="button"
            onClick={ this.getItem }
            data-testid="query-button"
          >
            Pesquisar
          </button>
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        </div>
        <ButtonCart />
        <SidebarCategories />
      </div>
    );
  }
}
