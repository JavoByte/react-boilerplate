import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Privacy.css';

class Privacy extends React.Component {
  render() {
    return (
      <div className="privacy">
        Insert here the <strong>Privacy Policy</strong>
      </div>
    );
  }
}

export default withStyles(s)(Privacy);
