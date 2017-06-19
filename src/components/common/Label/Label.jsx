import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Label.css';

class Label extends React.Component {

  static propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <label className={s.label} htmlFor={this.props.htmlFor}>
        { this.props.children }
      </label>
    );
  }
}

export default withStyles(s)(Label);
