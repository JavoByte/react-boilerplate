import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';
import InAppMarkdown from '../../common/InAppMarkdown';
import content from './About.md';

class About extends React.Component {
  render() {
    return (
      <div className="form-container">
        <Helmet>
          <title>About</title>
          <meta name="description" content="Get to know us" />
        </Helmet>
        <InAppMarkdown source={content} className={s.aboutMarkdown} />
      </div>
    );
  }
}

export default withStyles(s)(About);
