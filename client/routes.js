import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
/* Import components */
import App from './components/App';
import Welcome from './components/Welcome';
import Login from './components/Login';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="login" component={Login} />
    </Route>
);

export default routes;
