import invariant from 'invariant';
import { addLeadingSlash, createPath, parsePath } from 'history/PathUtils';

const noop = () => {};

const normalizeLocation = (object) => {
  const { pathname = '/', search = '', hash = '' } = object;
  return {
    from: (object.state || {}).from || {},
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
  };
};

const addBasename = (basename, location) => {
  if (!basename) {
    return location;
  }

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname,
  };
};

const stripBasename = (basename, location) => {
  if (!basename) {
    return location;
  }

  const base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) {
    return location;
  }

  return {
    ...location,
    pathname: location.pathname.substr(base.length),
  };
};

const createLocation = location =>
  (typeof location === 'string' ? parsePath(location) : normalizeLocation(location));

const createURL = location =>
  (typeof location === 'string' ? location : createPath(location));

const staticHandler = methodName => () => {
  invariant(
    false,
    'You cannot %s with <StaticRouter>',
    methodName);
};

const createStaticHistory = (location = '/', basename = '') => {
  const history = {
    context: {},
    action: 'POP',
    location: stripBasename(basename, createLocation(location)),
    go: staticHandler('go'),
    goBack: staticHandler('goBack'),
    goForward: staticHandler('goForward'),
    listen: noop,
    block: noop,
  };

  const createHref = path =>
    addLeadingSlash(basename + createURL(path));

  const push = (pushLocation) => {
    history.context.action = 'PUSH';
    history.context.location = addBasename(basename, createLocation(pushLocation));
    history.context.url = createURL(history.context.location);
  };

  const replace = (replaceLocation) => {
    history.context.action = 'REPLACE';
    history.context.location = addBasename(basename, createLocation(replaceLocation));
    history.context.url = createURL(history.context.location);
  };


  return {
    ...history,
    createHref,
    push,
    replace,
  };
};

export default createStaticHistory;
