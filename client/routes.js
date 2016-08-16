import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/* General Purpose Components */
import App from './components/App';
import Welcome from './components/Welcome';
import Conversations from './components/Conversations';
import Messages from './components/Messages'

/* Learner Related Components */
import Login from './components/Login';
import Signup from './components/Signup';
import LearnerDashboard from './components/LearnerDashboard';
import Learner from './components/Learner';
import Become from './components/Become';
import Calendar from './components/Calendar';
import Review from './components/Review';
import Profile from './components/Profile';
import MentorProfile from './components/MentorProfile';
// still in testing
import authUser from './components/auth/auth_user';
/* Mentor Related Components */
import MentorSignup from './components/MentorSignup';
import MentorLogin from './components/MentorLogin';
import Mentor from './components/Mentor';
import VideoChatPage from './components/VideoChatPage';


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
        <Route path="learner/:username/conversations" component={Conversations} />
        <Route path="learner/:username/conversations/:userId/:conversationId" component={authUser(Messages)} />
        <Route path="learner/:username/profile" component={authUser(Profile)} />
        <Route path="learner/:username/mentor/:mentorUsername/profile" component={authUser(MentorProfile)} />
        <Route path="learner/:username/mentor/:mentorUsername/review" component={authUser(Review)} />
        <Route path="learner/:username/videochat/:uid" component={authUser(VideoChatPage)} />
      </Route>
      <Route component={Mentor} >
        <Route path="mentor/:username" component={authUser(MentorProfile)} />
        <Route path="mentor/:username/profile" component={authUser(Profile)} />
        <Route path="mentor/:username/calendar" component={authUser(Calendar)} />
        <Route path="mentor/:username/conversations" component={authUser(Conversations)} />
        <Route path="mentor/:username/videochat/:uid" component={authUser(VideoChatPage)} />
        <Route path="mentor/:username/conversations/:userId/:conversationId" component={authUser(Messages)} />
      </Route>
    </Route>
);

export default routes;
