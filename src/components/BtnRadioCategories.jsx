import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnRadioCategories extends Component {
  render() {
    const { name, id, selectCategoryId } = this.props;
    return (
      <li>
        <label htmlFor={ id } data-testid="category">
          <input
            name="teste2"
            id={ id }
            type="radio"
            onClick={ selectCategoryId }
          />
          { name }
        </label>
      </li>
    );
  }
}

BtnRadioCategories.propTypes = {
  name: PropTypes.string.isRequired,
};
