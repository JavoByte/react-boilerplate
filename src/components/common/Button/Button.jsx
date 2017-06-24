import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Button.css';

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'success', 'info', 'danger', 'warning']),
    outline: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    type: 'button',
    onClick: null,
    outline: false,
    color: 'primary',
  }

  render() {
    return (
      <button
        type={this.props.type}
        className={
          cx(
            'button',
            {
              [s.outline]: this.props.outline,
              [s.primary]: this.props.color === 'primary',
              [s.success]: this.props.color === 'success',
              [s.danger]: this.props.color === 'danger',
              [s.warning]: this.props.color === 'warning',
              [s.info]: this.props.color === 'info',
            },
          )
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default withStyles(s)(Button);
