import React, { Component } from 'react';
import { getCategories } from '../services/api';
import BtnRadioCategories from '../components/BtnRadioCategories';

export default class SidebarCategories extends Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div>
        <h1>Categorias</h1>
        <ul>
          {categoriesList.map((item) => (
            <BtnRadioCategories key={ item.id } name={ item.name } />)) }
        </ul>
      </div>
    );
  }
}
