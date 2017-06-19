import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';
import sagas from '../sagas';

export default function configureStore(initialState, helpersConfig = {}) {
  const helpers = createHelpers(helpersConfig);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, thunk.withExtraArgument(helpers)];
  if (helpersConfig.history) {
    middleware.push(routerMiddleware(history));
  }
  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }
  store.rootSaga = sagas(sagaMiddleware);
  return store;
}
