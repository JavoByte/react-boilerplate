import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import validator from '../../../../validator';
import s from './ContactForm.css';
import FormGroup from '../../../common/FormGroup';
import Button from '../../../common/Button';

class ContactForm extends React.Component {
  static propTypes = {
    sendContactForm: PropTypes.func.isRequired,
    clearContactData: PropTypes.func.isRequired,
    sendApplicationMessage: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    contact: PropTypes.shape({
      message: PropTypes.string,
      errors: PropTypes.any,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  static rules = {
    email: ['email'],
    message: ['required'],
  };

  static messages = {
    email: {
      email: 'Please enter a valid email',
    },
    message: {
      required: 'This field is required',
    },
  };

  constructor(props) {
    super(props);
    this.fields = {};
    this.sendContactForm = this.sendContactForm.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    input: {},
    errors: {},
  };

  componentWillReceiveProps(props) {
    if (props.contact.errors && Object.keys(props.contact.errors).length > 0) {
      this.setState((prevState) => {
        let prevErrors = prevState.errors;
        const newErrors = props.contact.errors;
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
    } else if (props.contact.message) {
      this.props.clearContactData();
      const { message } = props.contact;
      this.props.sendApplicationMessage(message, 'info');
      this.props.history.push('/');
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

  sendContactForm() {
    if (this.validate()) {
      this.props.sendContactForm(this.state.input);
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
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.email} type="email" name="email" label="Your email" />
        <FormGroup onChange={this.handleOnChange} validate={this.validate} errors={this.state.errors.message} type="textarea" name="message" label="Message" hint="Max 255 chars" />
        <div className="text-center">
          <Button onClick={this.sendContactForm}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ContactForm);
