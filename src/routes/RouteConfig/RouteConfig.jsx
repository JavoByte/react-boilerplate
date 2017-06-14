import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function renderRoute(container, component, path, exact = null) {
  const components = {
    container,
    component,
  };
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <components.container>
          <components.component />
        </components.container>
        )
      }
    />
  );
}

function RouteConfig(routes) {
  const wrapper = routes.container ? routes.container : Wrapper;
  const children = routes.children || [];
  return (
    <div>
      {
        renderRoute(wrapper, routes.component, routes.path, true)
      }
      {
        children.map(route => renderRoute(wrapper, route.component, route.path))
      }
    </div>
  );
}

export default RouteConfig;
