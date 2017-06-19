import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ApplicationMessage.css';

class ApplicationMessage extends React.Component {
  static propTypes = {
    message: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string,
    }).isRequired,
    clearMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.clearMessage();
    }, 10 * 1000);
  }

  render() {
    const { message, type } = this.props.message;
    return (
      <div className={s[type]}>
        { message }
      </div>
    );
  }
}

export default withStyles(s)(ApplicationMessage);
