import React from 'react';
import PropTypes from 'prop-types';

class FormFeedbackContainer extends React.Component {

  static propTypes = {
    forAttribute: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  static contextTypes = {
    validationErrors: PropTypes.any, // eslint-disable-line react/prop
  };

  render() {
    const { forAttribute } = this.props;
    if (!forAttribute || !this.context.validationErrors) {
      return null;
    }
    let errors = this.context.validationErrors[forAttribute];
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    return (
      <div className={this.props.className ? this.props.className : 'form-feedback-container'}>
        {
          errors.map((error, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`error-${forAttribute}-${i}`}>
              {error}
            </span>
          ))
        }
      </div>
    );
  }
}

export default FormFeedbackContainer;
