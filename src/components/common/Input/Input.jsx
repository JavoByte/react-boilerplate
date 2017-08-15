import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Input extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    type: 'text',
    onChange: null,
    onBlur: null,
    readOnly: false,
    disabled: false,
    options: [],
    value: '',
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

  state = {
    value: undefined,
  };

  componentWillMount() {
    let value;
    if (this.props.type === 'select') {
      value = (Array.isArray(this.props.options) ?
        this.props.options[0] :
        Object.keys(this.props.options)[0]) || '';
      this.setState({
        value,
      }, () => {
        if (this.context.registerValue) {
          this.context.registerValue(this.props.name, value);
        }
      });
    } else {
      value = this.props.value;
    }

    if (value) {
      this.setState({
        value,
      }, () => {
        if (this.context.registerValue) {
          this.context.registerValue(this.props.name, value);
        }
      });
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.type === 'select') {
      if (!_.isEqual(this.props.options, props.options)) {
        // options have changed
        const prevValue = this.state.value;
        let value = this.state.value || props.value;
        if (Array.isArray(props.options) && props.options.indexOf(value) === -1) {
          // new props is an array and the value we had is not part of the array
          value = props.options[0];
        } else if (!Array.isArray(props.options) && !props.options[value]) {
          // new props is not an array and the value we had is not in the new options object
          value = Object.keys(props.options)[0];
        }
        if (prevValue !== value) {
          setTimeout(() => {
            this.setState({
              value,
            }, () => {
              if (this.context.registerValue) {
                this.context.registerValue(this.props.name, value);
              }
            });
          });
        }
      }
    } else {
      const { value } = this.state;
      if (props.value &&
        (
          (props.value !== value && value === undefined)
          || this.props.value !== props.value)) {
        const newValue = `${props.value}`;
        setTimeout(() => {
          this.setState({
            value: newValue,
          }, () => {
            if (this.context.registerValue) {
              this.context.registerValue(this.props.name, newValue);
            }
          });
        });
      }
    }
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
      if (this.context.registerValue) {
        this.context.registerValue(this.props.name, value);
      }
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
    const { name, type, options, ...otherProps } = this.props;
    let optionsAsObject = this.props.options || {};
    const props = { name, type };
    if (Array.isArray(options)) {
      const optionsObject = {};
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        optionsObject[option] = option;
      }
      optionsAsObject = optionsObject;
    }
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...otherProps}
            {...props}
            className={this.props.className}
            value={this.state.value || ''}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
        );
      case 'select':
        return (
          <select
            {...otherProps}
            {...props}
            className={this.props.className}
            disabled={this.props.disabled || this.props.readOnly}
            value={this.state.value || ''}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          >
            {
              Object.keys(optionsAsObject).map(key => (
                <option value={key} key={key}>
                  {
                    optionsAsObject[key]
                  }
                </option>
              ))
            }
          </select>
        );
      default:
        return (
          <input
            {...otherProps}
            {...props}
            className={this.props.className}
            value={this.state.value || ''}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
        );
    }
  }
}

export default Input;
