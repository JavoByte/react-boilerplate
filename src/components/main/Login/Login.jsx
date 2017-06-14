import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className={s.login}>
        Insert here the login page
      </div>
    );
  }
}

export default withStyles(s)(Login);
