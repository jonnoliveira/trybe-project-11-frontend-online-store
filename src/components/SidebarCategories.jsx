import React, { Component } from 'react';
import { getCategories } from '../services/api';
import BtnRadioCategories from './BtnRadioCategories';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class SidebarCategories extends Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  }

  // selectCategoryId = async ({ target }) => {
  //   const { categoryList } = this.props;

  //   const category = target.id;
  //   const search = await getProductsFromCategoryAndQuery(category, null);
  //   this.setState({ categoryList: search })
  // }

  render() {
    const { categoriesList } = this.state;
    const { selectCategoryId } = this.props;
    return (
      <div>
        <h1>Categorias</h1>
        <ul>
          {categoriesList.map((item) => (
            <BtnRadioCategories key={ item.id } name={ item.name } id={ item.id } selectCategoryId={ selectCategoryId } />)) }
        </ul>
      </div>
    );
  }
}
