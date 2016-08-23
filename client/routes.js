import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Welcome from './components/universal/Welcome';
import Login from './components/learner/Login';
import Signup from './components/learner/Signup';
import LearnerDashboard from './components/learner/LearnerDashboard';
import Learner from './components/learner/Learner';
import Become from './components/mentor/Become';
import Calendar from './components/universal/Calendar';
import Review from './components/learner/Review';
import Profile from './components/universal/Profile';
import MentorProfile from './components/universal/MentorProfile';
import authUser from './components/auth/auth_user';
import MentorSignup from './components/mentor/MentorSignup';
import MentorLogin from './components/mentor/MentorLogin';
import Mentor from './components/mentor/Mentor';
import VideoChatPage from './components/universal/VideoChatPage';

const routes = (
    <Route path="/" component={App} >
      <IndexRoute component={Welcome} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="become" component={Become} />
      <Route path="become/mentor" component={MentorSignup} />
      <Route path="become/login" component={MentorLogin} />
      <Route component={Learner} >
        <Route path="learner/:username" component={authUser(LearnerDashboard)} />
        <Route path="learner/:username/mentor/:mentorUsername/calendar" component={authUser(Calendar)} />}
        <Route path="learner/:username/profile" component={authUser(Profile)} />
        <Route path="learner/:username/mentor/:mentorUsername/profile" component={authUser(MentorProfile)} />
        <Route path="learner/:username/mentor/:mentorUsername/review" component={authUser(Review)} />
        <Route path="learner/:username/videochat/:uid" component={authUser(VideoChatPage)} />
      </Route>
      <Route component={Mentor} >
        <Route path="mentor/:username" component={authUser(MentorProfile)} />
        <Route path="mentor/:username/profile" component={authUser(Profile)} />
        <Route path="mentor/:username/calendar" component={authUser(Calendar)} />
        <Route path="mentor/:username/videochat/:uid" component={authUser(VideoChatPage)} />
      </Route>
    </Route>
);

export default routes;
