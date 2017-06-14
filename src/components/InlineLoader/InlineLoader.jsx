import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InlineLoader.css';

class InlineLoader extends React.Component {

  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: 'Cargando información',
  };

  render() {
    return (
      <div className="loader">
        {this.props.message}
      </div>
    );
  }
}

export default withStyles(s)(InlineLoader);
