import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RegisterForm.css';
import validator from '../../../../validator';
import Form from '../../../common/Form';
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

  static messages = {
    email: {
      email: 'Please, write a valid email',
    },
    first_name: {
      required: 'This field is required',
    },
    last_name: {
      required: 'This field is required',
    },
    password: {
      required: 'This field is required',
      confirmed: 'The passwords doesn\'t match',
    },
  };

  constructor(props) {
    super(props);
    this.fields = {};
    this.register = this.register.bind(this);
  }

  state = {
    input: {},
    errors: {},
  };

  validate(field = undefined) {
    let rules = this.constructor.rules;
    if (field) {
      let fieldRules;
      if (field.endsWith('_confirmation')) {
        const originalField = field.substring(0, field.length - 13);
        fieldRules = rules[originalField] || [];
        rules = {
          [originalField]: fieldRules,
        };
      } else {
        fieldRules = rules[field] || [];
        rules = {
          [field]: fieldRules,
        };
      }
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

  register(formData) {
    this.props.register(formData);
  }

  render() {
    return (
      <Form
        className="form-container"
        onSubmit={this.props.register}
        validationRules={{
          email: ['email'],
          password: ['required', 'confirmed'],
          first_name: ['required'],
          last_name: ['required'],
        }}
        validationMessages={{
          email: {
            email: 'Please, write a valid email',
          },
          first_name: {
            required: 'This field is required',
          },
          last_name: {
            required: 'This field is required',
          },
          password: {
            required: 'This field is required',
            confirmed: 'The passwords doesn\'t match',
          },
        }}
        externalRules={this.props.registration.errors}
      >
        <FormGroup type="email" name="email" label="E-Mail" />
        <FormGroup type="text" name="first_name" label="First name" />
        <FormGroup type="text" name="last_name" label="Last name" />
        <FormGroup type="password" name="password" label="Password" />
        <FormGroup type="password" name="password_confirmation" label="Password confirmation" />
        <div className="text-center">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default withStyles(s)(RegisterForm);
