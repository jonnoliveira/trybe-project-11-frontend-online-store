import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddComents extends Component {
  render() {
    const {
      email,
      rating,
      text,
    } = this.props;

    return (
      <div className="form-answer">
        <div>
          <h3>Email:</h3>
          <p data-testid="review-card-email">{ email }</p>
        </div>
        <div>
          <h3>Nota:</h3>
          <p data-testid="review-card-rating">{ rating }</p>
        </div>
        <div>
          <h3>Comentário:</h3>
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
