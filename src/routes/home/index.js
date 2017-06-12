/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action() {
    const data = {
      news: [
        {
          link : 'https://www.google.com/'
        },
      ],
    };
    if (!data || !data.news) throw new Error('Failed to load the news feed.');
    return {
      title: 'React Starter Kit',
      component: <Layout><Home news={data.news} /></Layout>,
    };
  },

};
