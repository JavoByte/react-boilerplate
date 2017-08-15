import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import validator from '../../../validator';


class Form extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    externalErrors: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    validationRules: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    validationMessages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: 'form',
    externalErrors: null,
    validationRules: {},
    validationMessages: {},
    onSubmit: (data) => {
      console.warn('Unhandled submit to submit data', data);
    },
  };

  constructor(props) {
    super(props);
    this.registerValue = this.registerValue.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    input: {},
    errors: {},
  }

  getChildContext() {
    return {
      registerValue: this.registerValue,
      validate: this.validate,
      validationErrors: this.state.errors,
    };
  }

  componentWillReceiveProps(props) {
    if (props.externalErrors) {
      this.setState((prevState) => {
        let prevErrors = prevState.errors;
        const newErrors = props.externalErrors;
        const keys = Object.keys(newErrors);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const prevErrorsForKey = prevErrors[key] || [];
          let errors = newErrors[key];
          errors = Array.isArray(errors) ? errors : [errors];
          prevErrors = {
            ...prevErrors,
            [key]: [
              ...prevErrorsForKey,
              ...errors,
            ],
          };
        }
        return {
          errors: prevErrors,
        };
      });
    }
  }

  registerValue(field, value) {
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        [field]: value,
      },
    }));
  }

  validate(field = undefined) {
    if (!this.props.validationRules) {
      return true;
    }
    const newErrors = validator(
      this.state.input,
      this.props.validationRules,
      field,
      this.props.validationMessages);
    const valid = Object.keys(newErrors).length === 0;
    this.setState((prevState) => {
      if (valid) {
        if (!field) {
          return {
            errors: {},
          };
        }
        const newStateErrors = { ...prevState.errors };
        delete newStateErrors[field];
        return {
          errors: newStateErrors,
        };
      }
      return {
        errors: {
          ...prevState.errors,
          ...newErrors,
        },
      };
    });

    return valid;
  }

  submit(event) {
    event.preventDefault();
    if (this.validate()) {
      const { input: data } = this.state;
      this.props.onSubmit(data);
    }
  }

  render() {
    return (
      <form className={cx('pure-form', this.props.className)} onSubmit={this.submit}>
        { this.props.children }
      </form>
    );
  }
}

Form.childContextTypes = {
  registerValue: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
};

export default Form;
