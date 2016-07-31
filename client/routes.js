import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
/* Import components */
import App from './components/App';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Learner from './components/Learner';
import Become from './components/Become';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="learner" component={Learner} />
      <Route path="become" component={Become} />
    </Route>
);

export default routes;
