import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import App from '../components/App';
import Layout from '../components/common/Layout';

const setup = (store, context, history) => (
  <Provider store={store} context={context}>
    <ConnectedRouter history={history}>
      <App context={context}>
        <Layout>
          <Routes />
        </Layout>
      </App>
    </ConnectedRouter>
  </Provider>
);

export default setup;
