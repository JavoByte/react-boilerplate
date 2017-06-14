import React from 'react';
import { Route } from 'react-router-dom';

class ConnectedRoute extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { children, component, ...newProps } = this.props;
    return (
      <Route
        {...newProps}
        render={() => (
          <this.props.component {...this.props} />
          )
        }
      />
    );
  }
}

export default ConnectedRoute;
