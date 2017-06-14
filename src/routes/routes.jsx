import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../components/main/Home';
import About from '../components/main/About';
import Contact from '../components/main/Contact';
import Privacy from '../components/main/Privacy';
import Login from '../components/main/Login';
import Error404 from '../components/main/Error404';
import Users from './Users';

const routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/login" component={Login} />
      <Route path="/users" component={Users} />
      <Route component={Error404} />
    </Switch>
  </Layout>
);

export default routes;
