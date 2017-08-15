/**
 * function to render the basic application HTML
**/
import Helmet from 'react-helmet';
import config from './config';

export default (content, preloadedState, styles = [], scripts = []) => {
  const helmet = Helmet.renderStatic();
  const styleTags = styles.map(style =>
          `<style
            key="${style.id}"
            id="${style.id}">${style.cssText}</style>`,
        ).reduce((acc, tag) => acc + tag, '');
  const scriptTags = scripts.map(script =>
          `<script
            key="${script}"
            src="${script}"></script>`,
        ).reduce((acc, tag) => acc + tag, '');
  let analytics;
  if (config.analytics.googleTrackingId) {
    analytics = `
    <script>
      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
      ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')
    </script>
    <script src="https://www.google-analytics.com/analytics.js" async defer />
    `;
  } else {
    analytics = '';
  }

  const html = `
    <! DOCTYPE html>
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" />
        ${styleTags}
      </head>
      <body>
        <div id="app">${content}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        ${scriptTags}
        ${analytics}
      </body>
    </html>
  `;
  return html;
};

