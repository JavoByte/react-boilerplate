import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';

class Contact extends React.Component {
  render() {
    return (
      <div className={s.contact}>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Send us a message" />
        </Helmet>
        This will be the contact page. Insert the form here
      </div>
    );
  }
}

export default withStyles(s)(Contact);
