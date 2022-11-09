import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnRadioCategories extends Component {
  render() {
    const { name } = this.props;
    return (
      <li>
        <label htmlFor="teste" data-testid="category">
          <input
            name="teste2"
            id="teste"
            type="radio"
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
