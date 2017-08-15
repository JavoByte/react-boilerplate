export default {
  // API Gateway
  api: {
    url: process.env.API_SERVER_URL || 'http://localhost:8000/api/',
    defaultErrorMessage: 'Ocurrió un error al conectar con el servidor',
  },
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  defaultValidationMessages: {
    required: 'This field is required',
    email: 'Please type a valid email',
    confirmed: 'This field must be confirmed',
  },
};

