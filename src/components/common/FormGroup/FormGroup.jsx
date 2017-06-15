import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './FormGroup.css';
import Label from '../Label';
import Input from '../Input';

class FormGroup extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    validate: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    name: 'input',
    label: 'missing label',
    type: 'text',
    errors: [],
    onChange: null,
    validate: null,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  state = {
    value: '',
  }

  getValue() {
    return this.state.value;
  }

  handleChange(event) {
    event.persist();
    this.setState({
      value: event.target.value,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.name, this.state.value);
      }
    });
  }

  handleBlur() {
    if (this.props.validate) {
      this.props.validate(this.props.name);
    }
  }

  render() {
    const { name, label, type } = this.props;
    const { errors } = this.props;
    const hasError = errors.length > 0;
    if (this.props.children) {
      return (
        <div className={s.formGroup}>
          { this.props.children }
        </div>
      );
    }
    const inputProps = { name, type, onChange: this.handleChange, onBlur: this.handleBlur };
    return (
      <div className={cx(s.formGroup, { [s.hasError]: hasError })} >
        <Label htmlFor={name}>{label}</Label>
        <Input {...inputProps} />
        {errors.map((error, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className={s.feedback} key={i}>
            { error }
          </span>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(FormGroup);
