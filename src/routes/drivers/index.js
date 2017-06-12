import React from 'react';
import DriversContainer from './DriversContainer';
import Layout from '../../components/Layout';

export default {
  path: '/drivers',
  children: [
    {
      path: '/',
      async action() {
        return {
          title: 'Conductores',
          component: <Layout><DriversContainer /></Layout>,
        };
      },
    },
  ],
};
