import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from '../components/App';

const setup = (store, routes, context, history) => (
  <Provider store={store} context={context}>
    <ConnectedRouter history={history}>
      <App context={context}>
        { routes }
      </App>
    </ConnectedRouter>
  </Provider>
);

export default setup;
