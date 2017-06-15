import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Input.css';

class Input extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    onChange: null,
    onBlur: null,
  }

  render() {
    const { name, type, onChange, onBlur } = this.props;
    const props = { name, type, onChange, onBlur };
    return (
      <input className={s.input} {...props} />
    );
  }
}

export default withStyles(s)(Input);
