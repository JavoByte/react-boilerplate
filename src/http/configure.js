/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../config';

function setCookie(newCookie) {
  axios.defaults.headers.cookie = newCookie;
}

function configureAxios() {
  axios.defaults.baseURL = config.api.url;
  axios.defaults.withCredentials = true;
}

export { configureAxios };
export { setCookie as setAxiosCookie };
