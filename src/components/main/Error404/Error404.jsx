import React from 'react';
import Helmet from 'react-helmet';

export default class Error404 extends React.Component {
  render() {
    return (
      <div className="error404">
        <Helmet>
          <title>Not found</title>
          <meta name="description" content="Page not found" />
        </Helmet>

        Sorry. We couldn't find the page you were looking for :(
      </div>
    )
  }
}
