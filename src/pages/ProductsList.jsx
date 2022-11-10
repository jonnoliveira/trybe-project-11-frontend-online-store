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
    categoryList: [],
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

  selectCategoryId = async ({ target }) => {
    const category = target.id;
    const search = await getProductsFromCategoryAndQuery(category, null);
    this.setState({ categoryList: search.results })
  }

  render() {
    const { inputValue, listInputItems, categoryList } = this.state;
    return (
      <div className="container-all">
        <SidebarCategories categoryList={ categoryList } selectCategoryId={ this.selectCategoryId } />
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
                categoryList.length !== 0
                  ? (
                    <ul className="itemsList">
                      { categoryList.map((item) => (
                        <CartItems
                          key={ item.id }
                          item={ item }
                        />
                      )) }
                    </ul>
                  )
                  : null
              }
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
