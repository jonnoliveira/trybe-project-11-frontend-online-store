import React, { Component } from 'react';
import ButtonCart from '../components/ButtonCart';
import CartItems from '../components/CartItems';
import SidebarCategories from '../components/SidebarCategories';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
    //  CONSIDERANDO QUE AS PESSOAS NAO VAO PROCURAR POR ID

    const search = await getProductsFromCategoryAndQuery(null, inputValue);
    this.setState({ listInputItems: search.results });
    console.log(search.results);

    // const url = fetch(`https://api.mercadolibre.com/sites/MLB/${inputValue}`);
    // const response = (await url).json();
    // const data = await response;
    // console.log(data);
  };

  render() {
    const { inputValue, listInputItems } = this.state;
    return (
      <div className="container-all">
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
          <div className="results">
            {
              listInputItems.length !== 0
                ? (
                  <ul>
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
        <SidebarCategories />
      </div>
    );
  }
}
