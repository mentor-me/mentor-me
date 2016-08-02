import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
/* Import components */
import App from './components/App';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import LearnerDashboard from './components/LearnerDashboard';
import Learner from './components/Learner';
import Become from './components/Become';
import Calendar from './components/Calendar';
import LearnerProfile from './components/Calendar';
import MentorProfile from './components/MentorProfile';

const routes = (
    <Route path="/" component={App} >
      <IndexRoute component={Welcome} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="become" component={Become} />
      <Route component={Learner} >
        <Route path="learner/:username" component={LearnerDashboard} />
        <Route path="learner/:username/calendar" component={Calendar} />
        <Route path="learner/:username/profile" component={LearnerProfile} />
        <Route path="learner/:username/mentor/:mentorUsername/profile" component={MentorProfile} />
      </Route>
    </Route>
);

export default routes;
