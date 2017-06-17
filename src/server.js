/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { END } from 'redux-saga';
import Helmet from 'react-helmet';
import { setServerRedirect, sendApplicationMessage } from './actions/application';
import { configureAxios, setAxiosCookie } from './http/configure';
import html from './html';
import { ErrorPageWithoutStyle } from './components/main/FatalErrorPage';
import errorPageStyle from './components/main/FatalErrorPage/ErrorPage.css';
import setup from './setup';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: config.auth.jwt.secret,
  credentialsRequired: false,
  requestProperty: 'jwtData',
  getToken: req => req.cookies.id_token,
}));
// Error handler for express-jwt
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    console.error('[express-jwt-error]', err);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
    // Continue normally. Just the jwtData key in the response won't be set
    next();
  } else {
    // Error raised by something else. Throw it to be better handled
    next(err);
  }
});


if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    const { jwtData } = req;
    const initialState = {
      session: {
        user: jwtData ? jwtData.user : null,
      },
    };

    configureAxios();
    if (jwtData && jwtData.user) {
      setAxiosCookie(req.headers.cookie);
    }

    const store = configureStore(initialState);

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };
    ReactDOM.renderToString(setup(store, context, req.url));
    if (context.history.context.url) {
      const { from } = context.history.context.location;
      if (from) {
        res.cookie('referrer', JSON.stringify(from));
      }
      res.redirect(302, context.history.context.url);
    } else {
      const { referrer } = req.cookies;
      if (referrer) {
        // There's a route to redirect after this path.
        // This request most likely will render the login path

        res.clearCookie('referrer');
        try {
          const from = JSON.parse(referrer);
          store.dispatch(setServerRedirect(from));
          if (from.message) {
            store.dispatch(sendApplicationMessage(from.message, from.messageType, 'redirect'));
          }
        } catch (error) {
          console.error(error);
        }
      }
      const { rootSaga } = store;
      store.dispatch(END);
      rootSaga.done.then(() => {
        const content = ReactDOM.renderToString(setup(store, context, req.url));
        const styles = [
          { id: 'css', cssText: [...css].join('') },
        ];
        const scripts = [
          assets.vendor.js,
          assets.client.js,
        ];
        const preloadedState = store.getState();
        res.status(200);
        res.send(html(content, preloadedState, styles, scripts));
        res.end();
      });
    }
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const styles = [{ id: 'css', cssText: errorPageStyle._getCss() }]; // eslint-disable-line no-underscore-dangle
  const content = (
    <div>
      <Helmet>
        <title>Internal server error</title>
        <meta name="description" content={err.message} />
      </Helmet>

      <ErrorPageWithoutStyle error={err} />
    </div>
  );
  res.status(err.status || 500);
  res.send(html(ReactDOM.renderToString(content), {}, styles));
});

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});
