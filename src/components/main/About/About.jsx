import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';

class About extends React.Component {
  render() {
    return (
      <div className={s.about}>
        GreyTech solutions. About page.
        Please <strong>read the docs</strong>before developing and editing this template
      </div>
    );
  }
}

export default withStyles(s)(About);
