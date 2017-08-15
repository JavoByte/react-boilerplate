import { push } from 'react-router-redux';
import {
  ACTION_API_ERROR,
  ACTION_APPLICATION_SEND_MESSAGE,
  HTTP_STATUS_UNAUTHENTICATED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} from '../constants';

const errorMiddleware = () => next => (action) => {
  if (action.type === ACTION_API_ERROR && action.handledType) {
    const { error } = action;
    const { response } = error;
    if (response && response.status) {
      switch (response.status) {
        case HTTP_STATUS_UNAUTHENTICATED:
          // Should redirect to login with info message
          return next((dispatch) => {
            dispatch(push('/login'));
            dispatch({
              type: ACTION_APPLICATION_SEND_MESSAGE,
              message: {
                type: 'info',
                identifier: 'unauthenticated',
                message: 'Please, log in',
              },
            });
          });
        case HTTP_STATUS_FORBIDDEN:
          // should redirect to home with warning message
          return next((dispatch) => {
            dispatch(push('/'));
            dispatch({
              type: ACTION_APPLICATION_SEND_MESSAGE,
              message: {
                type: 'warning',
                identifier: 'unauthorized',
                message: 'Please, log in',
              },
            });
          });
        case HTTP_STATUS_UNPROCESSABLE_ENTITY:
          return next({
            type: action.handledType,
            error: response.data,
          });
        default:
          return next({
            type: ACTION_APPLICATION_SEND_MESSAGE,
            message: {
              type: 'error',
              identifier: ACTION_API_ERROR,
              message: error.message,
            },
          });
      }
    } else {
      return next({
        action: ACTION_API_ERROR,
        error,
      });
    }
  } else {
    return next(action);
  }
};

export default errorMiddleware;
