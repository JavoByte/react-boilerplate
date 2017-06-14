import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import users from './users';

function About() {
  return (
    <div>
      This is the about page
    </div>
  );
}

const routes = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    { users() }
  </Layout>
);

export default routes;
