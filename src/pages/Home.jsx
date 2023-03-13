import React, { Component } from 'react';
import Header from '../components/Header';
import CartItems from '../components/CartItems';
import SidebarCategories from '../components/SidebarCategories';
import notSearch from '../assets/notSearch.svg';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import '../css/Home.css';

export default class Home extends Component {
  state = {
    inputValue: '',
    listInputItems: [],
    categoryList: [],
    count: 0,
    isLoading: false,
  };

  componentDidMount() {
    this.cartSizeCounter();
  }

  cartSizeCounter = () => {
    if (localStorage.savedItems) {
      const recoverProducts = JSON.parse(localStorage.getItem('savedItems'));
      const arrayOfQuantitys = recoverProducts.map((product) => product.quantity);
      const sum = arrayOfQuantitys.reduce((acc, curr) => acc + curr);
      this.setState({ count: sum });
    }
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
    this.setState({ isLoading: true });
    const validValue = inputValue.split(' ').join('_');
    const search = await getProductsFromCategoryAndQuery(null, validValue);

    this.setState({
      listInputItems: search.results,
      categoryList: [],
      isLoading: false,
    });
  };

  selectCategoryId = async ({ target }) => {
    this.setState({ isLoading: true });
    const category = target.id;
    const search = await getProductsFromCategoryAndQuery(category, null);
    this.setState({
      categoryList: search.results,
      listInputItems: [],
      isLoading: false,
    });
  };

  render() {
    const {
      inputValue, listInputItems, categoryList, count, isLoading,
    } = this.state;
    return (
      <div className="home-container">
        <Header
          onChangeHandler={ this.onChangeHandler }
          getItem={ this.getItem }
          inputValue={ inputValue }
          count={ count }
        />
        <SidebarCategories
          categoryList={ categoryList }
          selectCategoryId={ this.selectCategoryId }
        />
        <div className="home-productsList-container">
          {
            categoryList.length !== 0 && isLoading === false
                  && (
                    <ul className="home-itemsList">
                      { categoryList.map((items) => (
                        <CartItems
                          key={ items.id }
                          item={ items }
                          cartSizeCounter={ this.cartSizeCounter }
                        />
                      )) }
                    </ul>
                  )
          }
          {
            listInputItems.length !== 0 && isLoading === false
              && (
                <ul className="home-itemsList">
                  { listInputItems.map((item) => (
                    <CartItems
                      key={ item.id }
                      item={ item }
                      cartSizeCounter={ this.cartSizeCounter }
                    />
                  )) }
                </ul>
              )
          }
          {
            isLoading
              ? (
                <Loading />
              )
              : (
                <div className="home-notfound-container">
                  <img src={ notSearch } alt="Nenhuma busca icon" />
                  <p> Você ainda não realizou uma busca...</p>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
