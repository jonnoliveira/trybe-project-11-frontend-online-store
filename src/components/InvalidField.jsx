import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/InvalidFields.css';

export default class InvalidField extends Component {
  render() {
    const { hidden } = this.props;

    return (
      <div hidden={ hidden } data-testid="error-msg" className="invalidFields-container">
        <p>Preencha corretamente todos os campos acima.</p>
      </div>
    );
  }
}

InvalidField.propTypes = {
  hidden: PropTypes.bool.isRequired,
};
