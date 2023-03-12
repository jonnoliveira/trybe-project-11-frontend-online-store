import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import BtnRadioCategories from './BtnRadioCategories';
import list from '../assets/list.svg';
import '../css/SidebarCategories.css';

export default class SidebarCategories extends Component {
  state = {
    categoriesList: [],
    isListed: false,
  };

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  }

  showList = () => {
    const { isListed } = this.state;

    if (isListed) {
      this.setState({ isListed: false });
    } else {
      this.setState({ isListed: true });
    }
  };

  handleFunctionAndState = ({ target }) => {
    const { selectCategoryId } = this.props;

    selectCategoryId({ target });
    this.setState({ isListed: false });
  };

  render() {
    const { categoriesList, isListed } = this.state;
    return (
      <div className="categories-container">
        <button
          type="button"
          className="categories-btn"
          onClick={ this.showList }
        >
          Categorias
          <img src={ list } alt="List icon" />
        </button>
        {
          isListed
            && (
              <ul className="categories-list">
                {categoriesList.map((item) => (
                  <BtnRadioCategories
                    key={ item.id }
                    name={ item.name }
                    id={ item.id }
                    handleFunctionAndState={ this.handleFunctionAndState }
                    isListed={ isListed }
                  />)) }
              </ul>
            )
        }

      </div>
    );
  }
}

SidebarCategories.propTypes = {
  selectCategoryId: PropTypes.func.isRequired,
};
