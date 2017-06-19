import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createStaticHistory from './createStaticHistory';
import Routes from '../routes';
import App from '../components/App';
import Layout from '../components/common/Layout';

class ServerRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    history: createStaticHistory(),
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      router: {
        staticContext: this.props.history.context,
      },
    };
  }

  render() {
    const { history, ...props } = this.props;

    return <Router {...props} history={history} />;
  }
}

const setup = (store, context, url) => {
  const history = createStaticHistory(url);
  const { insertCss } = context;
  const appContext = {
    insertCss,
  };
  context.history = history; // eslint-disable-line no-param-reassign
  return (
    <Provider store={store} context={context}>
      <ServerRouter history={history} context={context} location={url}>
        <App context={appContext}>
          <Layout>
            <Routes />
          </Layout>
        </App>
      </ServerRouter>
    </Provider>
  );
};

export default setup;
