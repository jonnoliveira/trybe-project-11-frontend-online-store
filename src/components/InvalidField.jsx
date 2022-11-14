import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InvalidField extends Component {
  render() {
    const { hidden } = this.props;

    return (
      <div hidden={ hidden } data-testid="error-msg">
        <p>Campos inválidos</p>
      </div>
    );
  }
}

InvalidField.propTypes = {
  hidden: PropTypes.bool.isRequired,
};
