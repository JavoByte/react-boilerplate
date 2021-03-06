import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Button.css';

class Button extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['submit', 'button']),
    color: PropTypes.oneOf(['primary', 'success', 'info', 'danger', 'warning']),
    outline: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: null,
    type: 'button',
    onClick: null,
    outline: false,
    color: 'primary',
    className: null,
  }

  render() {
    return (
      <button
        type={this.props.type}
        className={
          cx(
            'pure-button',
            'button',
            {
              [s.outline]: this.props.outline,
              [s.primary]: this.props.color === 'primary',
              [s.success]: this.props.color === 'success',
              [s.danger]: this.props.color === 'danger',
              [s.warning]: this.props.color === 'warning',
              [s.info]: this.props.color === 'info',
              [this.props.className]: this.props.className,
            },
          )
        }
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default withStyles(s)(Button);
