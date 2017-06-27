import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './FormGroup.css';
import Label from '../Label';
import Input from '../Input';
import FormFeedbackContainer from '../FormFeedbackContainer';

class FormGroup extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    name: 'input',
    label: 'missing label',
    hint: null,
    type: 'text',
  };

  static contextTypes = {
    validationErrors: PropTypes.any, // eslint-disable-line react/prop
  };

  render() {
    const { name, label, type, hint } = this.props;
    const { validationErrors } = this.context;
    let errors;
    if (!validationErrors) {
      errors = [];
    } else {
      errors = validationErrors[this.props.name] || [];
    }
    const hasError = errors.length > 0;
    if (this.props.children) {
      return (
        <div className={s.formGroup}>
          { this.props.children }
        </div>
      );
    }
    const inputProps = { name, type };
    return (
      <div className={cx(s.formGroup, { [s.hasError]: hasError })} >
        <Label htmlFor={name}>{label}</Label>
        <Input {...inputProps} />
        {
          hint && errors.length === 0 ?
            <span className={s.hint} key={'hint'}>
              { hint }
            </span>
          : null
        }
        <FormFeedbackContainer forAttribute={this.props.name} />
      </div>
    );
  }
}

export default withStyles(s)(FormGroup);
