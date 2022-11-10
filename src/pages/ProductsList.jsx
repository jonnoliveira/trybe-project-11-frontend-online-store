import React, { Component } from 'react';
import ButtonCart from '../components/ButtonCart';
import CartItems from '../components/CartItems';
import SidebarCategories from '../components/SidebarCategories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import './ProductList.css';

export default class ProductsList extends Component {
  state = {
    inputValue: '',
    listInputItems: [],
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
    const validValue = inputValue.split(' ').join('_');
    const search = await getProductsFromCategoryAndQuery(null, validValue);

    this.setState({ listInputItems: search.results });
    console.log(search.results);
  };

  render() {
    const { inputValue, listInputItems } = this.state;
    return (
      <div className="container-all">
        <SidebarCategories />
        <div className="searchAndResults">
          <div>
            <div data-testid="home-initial-message">
              <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
            </div>
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
            <ButtonCart />
            <div>
              {
                listInputItems.length !== 0
                  ? (
                    <ul className="itemsList">
                      { listInputItems.map((item) => (
                        <CartItems
                          key={ item.id }
                          item={ item }
                        />
                      )) }
                    </ul>
                  )
                  : <p>Nenhum produto foi encontrado</p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
