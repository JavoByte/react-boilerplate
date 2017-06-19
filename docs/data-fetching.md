## Data Fetching

Surely, you'll need to get data from an HTTP server. This boilerplate is preconfigured to
work with (axios)[axios] which works out of the box in both server and client side.

In the `config.js` file, you'll find an `API_URL` which will be configured as `baseURL` for
axios.

By default, axios will work with the `withCrentials` option activated. This is because this
project is structured to work with sessions stored via cookies.

## Guideline

Your React components should not make http calls directly, i.e., they shouldn't even import
the axios library. Instead, we'll use redux to handle this requests.

Surely you are familiar with thunk, but our approach is slightly different. Our approach is
to keep action creators as pure functions which returns always an object. For this purpose,
we use (Redux sagas)[sagas]. Check out how `sagas` work.

You should create a new `saga` in the `sagas` folder and register it in the main saga (`sagas/index.js`)

So, you're saga would basically look like this:

```javascript
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

function* myHttpGet(action) {
  try {
    const response = yield call(() => axios.get('url'));
    // Success response
    yield put({
      type: 'DATA_FETCH_SUCCESS',
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: 'DATA_FETCH_ERROR',
      error,
    });
  }
}

function getSaga(action) {
  switch (action.type) {
    case 'DATA_FETCH_START':
      return myHttpGet;
    default:
      return null;
  }
}

export default getSaga;

```

The `getSaga` function will receive the `action` dispatched to the redux state and return
the `saga` to execute if `action.type` matches with `'DATA_FETCH_START'`.

When the http call is succesful, the `'DATA_FETCH_SUCCESS'` action will be dispatched. When an error arises,
`'DATA_FETCH_ERROR'` will be dispatched.

With this approach, your reducer should be simplified to something like this:

```javascript
export default function myAwesomeReducer(state = {
  loading: false,
  data: null
}, action) {
  switch (action.type) {
    case 'DATA_FETCH_START':
      return {
        ...state,
        loading: true,
      };
    case 'DATA_FETCH_SUCCESS':
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case 'DATA_FETCH_START':
      return {
        ...state,
        error: action.error
        loading: false,
      };
    }
  }
}
```

[axios]: https://github.com/mzabriskie/axios
[thunk]: https://github.com/gaearon/redux-thunk
[sagas]: https://github.com/redux-saga/redux-saga
