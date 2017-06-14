import config from './config';

export default {
  ...config,
  // Node.js app
  port: process.env.PORT || 3000,
};
