import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RegisterForm.css';
import validator from '../../../../validator';
import FormGroup from '../../../common/FormGroup';
import Button from '../../../common/Button';


class RegisterForm extends React.Component {

  static propTypes = {
    registration: PropTypes.shape({
      posting: PropTypes.boolean,
      errors: PropTypes.any,
    }).isRequired,
    register: PropTypes.func.isRequired,
  }

  static rules = {
    email: ['email'],
    password: ['required'],
  };

  static messages = {
    email: {
      email: 'Por favor, escribe un correo válido',
    },
    password: {
      required: 'Escribe tu contraseña',
    },
  };

  constructor(props) {
    super(props);
    this.fields = {};
    this.register = this.register.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    input: {},
    errors: {},
  };

  componentWillReceiveProps() {
    // Wait to this.props is populated
    setTimeout(() => {
      if (this.props.registration.errors) {
        this.setState((prevState) => {
          let prevErrors = prevState.errors;
          const newErrors = this.props.registration.errors;
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
    });
  }

  handleOnChange(name, value) {
    this.setState(prevState => (
      {
        input: {
          ...prevState.input,
          [name]: value,
        },
      }
    ));
  }

  validate(field = undefined) {
    let rules = this.constructor.rules;
    if (field) {
      const fieldRules = rules[field] || [];
      rules = {
        [field]: fieldRules,
      };
    }
    const newErrors = validator(this.state.input, rules, this.constructor.messages);
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

  register() {
    if (this.validate()) {
      const input = this.state.input;
      this.props.register(input);
    }
  }

  render() {
    return (
      <div className="registerform">
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.email} type="email" name="email" label="E-Mail" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.first_name} type="text" name="first_name" label="First name" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.last_name} type="text" name="last_name" label="Last name" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.password} type="password" name="password" label="Password" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.password_confirmation} type="password" name="password_confirmation" label="Password" />
        <Button onClick={this.register}>Submit</Button>
      </div>
    );
  }
}

export default withStyles(s)(RegisterForm);
