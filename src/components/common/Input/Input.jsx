import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    type: 'text',
    onChange: null,
    onBlur: null,
  };

  static contextTypes = {
    validate: PropTypes.func,
    registerValue: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleChange(event) {
    event.persist();
    let value = event.target.value;
    if (this.props.onChange) {
       // We need that, if Input overrides onChange, it returns the value.
      value = this.props.onChange(event);
    }
    this.setState({
      value,
    }, () => {
      this.context.registerValue(this.props.name, value);
    });
  }

  handleOnBlur(event) {
    event.persist();
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    setTimeout(() => {
      if (this.context.validate) {
        this.context.validate(this.props.name);
      }
    });
  }


  render() {
    const { name, type } = this.props;
    const props = { name, type };
    switch (type) {
      case 'textarea':
        return (
          <textarea
            className={this.props.className}
            {...this.props}
            {...props}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
        );
      default:
        return (
          <input
            className={this.props.className}
            {...this.props}
            {...props}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
        );
    }
  }
}

export default Input;
