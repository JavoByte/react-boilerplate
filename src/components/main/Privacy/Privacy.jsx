import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Privacy.css';

class Privacy extends React.Component {
  render() {
    return (
      <div className="privacy">
        <Helmet>
          <title>Privacy policy</title>
          <meta name="description" content="Check our privacy policy" />
        </Helmet>

        Insert here the <strong>Privacy Policy</strong>
      </div>
    );
  }
}

export default withStyles(s)(Privacy);
