import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Privacy.css';
import InAppMarkdown from '../../common/InAppMarkdown';
import content from './Privacy.md';

class Privacy extends React.Component {
  render() {
    return (
      <div className="form-container">
        <Helmet>
          <title>Privacy policy</title>
          <meta name="description" content="Check our privacy policy" />
        </Helmet>

        <InAppMarkdown source={content} className={s.policy} />
      </div>
    );
  }
}

export default withStyles(s)(Privacy);
