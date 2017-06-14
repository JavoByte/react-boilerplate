import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AppErrorMessage.css';

class AppErrorMessage extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        {this.props.message}
      </div>
    );
  }
}

export default withStyles(s)(AppErrorMessage);
