import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    type: 'button',
    onClick: null,
  }

  render() {
    return (
      <button type={this.props.type} className={s.button} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default withStyles(s)(Button);
