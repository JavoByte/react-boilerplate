import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';

class About extends React.Component {
  render() {
    return (
      <div className={s.about}>
        <Helmet>
          <title>About</title>
          <meta name="description" content="Get to know us" />
        </Helmet>
        GreyTech solutions. About page.
        Please <strong>read the docs</strong>before developing and editing this template
      </div>
    );
  }
}

export default withStyles(s)(About);
