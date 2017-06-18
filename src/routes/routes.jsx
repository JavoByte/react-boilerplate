import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import AuthRoute from './AuthRoute';
import OnlyGuestRoute from './OnlyGuestRoute';
import PrivateRoute from './PrivateRoute';
import Home from '../components/main/Home';
import About from '../components/main/About';
import Contact from '../components/main/Contact';
import Privacy from '../components/main/Privacy';
import Login from '../components/main/Login';
import Register from '../components/main/Register';
import Error404 from '../components/main/Error404';
import Users from './users';

// eslint-disable-next-line react/prop-types
const routes = ({ user }) => (
  <Switch user={user}>
    <Route exact path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/about" component={About} />
    <PrivateRoute path="/privacy" component={Privacy} user={user} validator={usr => (usr ? usr.email === 'email@email.com' : false)} message="Unauthorized" messageType="warning" messageErrorStatus={403} />
    <OnlyGuestRoute path="/login" component={Login} user={user} />
    <OnlyGuestRoute path="/register" component={Register} user={user} />
    <AuthRoute path="/users" component={Users} user={user} />
    <Route component={Error404} />
  </Switch>

);

export default routes;
