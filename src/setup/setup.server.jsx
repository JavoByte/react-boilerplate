import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import App from '../components/App';

const setup = (store, routes, context, url) => (
  <Provider store={store} context={context}>
    <StaticRouter context={context} location={url}>
      <App context={context}>
        {routes}
      </App>
    </StaticRouter>
  </Provider>
);

export default setup;
