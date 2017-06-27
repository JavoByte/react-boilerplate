import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginForm.css';
import Form from '../../../common/Form';
import FormGroup from '../../../common/FormGroup';
import Button from '../../../common/Button';

class LoginForm extends React.Component {

  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
    session: PropTypes.shape({
      errors: PropTypes.any,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.attemptLogin = this.attemptLogin.bind(this);
  }

  attemptLogin(formData) {
    const { email, password } = formData;
    const credentials = { email, password };
    this.props.attemptLogin(credentials);
  }

  render() {
    return (
      <Form
        className="form-container"
        validationRules={{
          email: ['email'],
          password: ['required'],
        }}
        validationMessages={{
          email: {
            email: 'Please, type a valid email',
          },
          password: {
            required: 'Please, type your password',
          },
        }}
        externalErrors={this.props.session.errors}
        onSubmit={this.attemptLogin}
      >
        <FormGroup type="email" name="email" label="E-Mail" />
        <FormGroup type="password" name="password" label="Password" />
        <div className="text-center">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default withStyles(s)(LoginForm);
