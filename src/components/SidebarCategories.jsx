import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import BtnRadioCategories from './BtnRadioCategories';

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
    const { selectCategoryId } = this.props;
    return (
      <div>
        <h1>Categorias</h1>
        <ul>
          {categoriesList.map((item) => (
            <BtnRadioCategories
              key={ item.id }
              name={ item.name }
              id={ item.id }
              selectCategoryId={ selectCategoryId }
            />)) }
        </ul>
      </div>
    );
  }
}

SidebarCategories.propTypes = {
  selectCategoryId: PropTypes.func.isRequired,
};
