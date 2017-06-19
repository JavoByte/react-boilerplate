import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import validator from '../../../../validator';
import s from './LoginForm.css';
import FormGroup from '../../../common/FormGroup';
import Button from '../../../common/Button';

class LoginForm extends React.Component {

  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    session: PropTypes.shape({
      errors: PropTypes.any,
    }).isRequired,
  };

  static rules = {
    email: ['email'],
    password: ['required'],
  };

  static messages = {
    email: {
      email: 'Please enter a valid email',
    },
    password: {
      required: 'Please enter a valid password',
    },
  };

  constructor(props) {
    super(props);
    this.fields = {};
    this.attemptLogin = this.attemptLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    input: {},
    errors: {},
  };

  componentWillReceiveProps(props) {
    if (props.session.errors) {
      this.setState((prevState) => {
        let prevErrors = prevState.errors;
        const newErrors = props.session.errors;
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

  attemptLogin() {
    if (this.validate()) {
      const { email, password } = this.state.input;
      const credentials = { email, password };
      this.props.attemptLogin(credentials);
    }
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

  render() {
    return (
      <div className="form-container">
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.email} type="email" name="email" label="E-Mail" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.password} type="password" name="password" label="Password" />
        <div className="text-center">
          <Button onClick={this.attemptLogin}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(LoginForm);
