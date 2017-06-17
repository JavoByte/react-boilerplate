import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import OnlyGuestRoute from './OnlyGuestRoute';
import Home from '../components/main/Home';
import About from '../components/main/About';
import Contact from '../components/main/Contact';
import Privacy from '../components/main/Privacy';
import Login from '../components/main/Login';
import Error404 from '../components/main/Error404';
import Users from './users';

// eslint-disable-next-line react/prop-types
const routes = ({ user }) => (
  <Switch user={user}>
    <Route exact path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/about" component={About} />
    <Route path="/privacy" component={Privacy} />
    <OnlyGuestRoute path="/login" component={Login} user={user} />
    <AuthRoute path="/users" component={Users} user={user} />
    <Route component={Error404} />
  </Switch>

);

export default routes;
