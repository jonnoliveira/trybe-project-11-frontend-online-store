import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Addcoments.css';

export default class AddComents extends Component {
  render() {
    const {
      email,
      rating,
      text,
    } = this.props;

    return (
      <div className="addComents-container">
        <div className="addComents-email">
          <h4>Email:</h4>
          <p data-testid="review-card-email">{ email }</p>
        </div>
        <div className="addComents-grade">
          <h4>Nota:</h4>
          <p data-testid="review-card-rating">{ rating }</p>
        </div>
        <div className="addComents-coments">
          <h4>Comentário:</h4>
          <p data-testid="review-card-evaluation">{ text }</p>
        </div>
      </div>
    );
  }
}

AddComents.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
