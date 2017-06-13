import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {
  return (
    <div>
      This is the home
    </div>
  );
}

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
  </Layout>
);

export default routes;
