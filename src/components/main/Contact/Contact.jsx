import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';

class Contact extends React.Component {
  render() {
    return (
      <div className={s.contact}>
        This will be the contact page. Insert the form here
      </div>
    );
  }
}

export default withStyles(s)(Contact);
