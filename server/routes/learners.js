var router    = require("express").Router();
var _         = require('lodash');
var Users     = require('../models/user');
var Learners  = require('../models/userLearner');


router.get('/learner', function(req, res){
  console.log("/learner");

});
router.get('/learner/search', function(req, res){
  console.log("/learner/search");
  var term = req.query.q ;
  console.log(term);
  Learners.learnerSearchMentors(req, res, term);

});

router.get('/learner/mentors', function(req, res){
  console.log("/learner/mentors");
  Learners.learnerFetchMentors(req, res);

});


router.post('/learner/users', function(req, res){
  console.log('learner/users');
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip', 'primary_role',
                'secondary_role', 'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );
  var skills = req.body.skills
  var preferences = req.body.preferences

  Learners.learnerCreate(req, res, newUser, skills, preferences);
});



router.get('/learner/users/:userId', function(req, res){
  var userId = req.params.userId;
  Learners.learnerFetchedById(req, res, userId);
});


router.post('/learner/users/:userId/appointment', function(req, res){
  var appointment = _.pick(req.body, 'notes', 'startTime', 'endTime',
                    'location', 'mentorId');
  appointment.learnerId = req.params.userId;
  Learners.learnerScheduleAppointment(req, res, appointment);
});

router.put('/learner/users/:userId/appointment/:appId', function(req, res){
  var appId = req.params.appId;
  var appointment = _.pick(req.body, 'notes', 'startTime', 'endTime',
                    'location');
  Learners.learnerUpdateAppointment(req, res, appointment, appId);
});

router.delete('/learner/users/:userId/appointment/:appId', function(req, res){
  var appId = req.params.appId;
  Learners.learnerDeleteAppointment(req, res, appId);
});

router.get('/learner/users/:userId/appointments', function(req, res){
  var userId = req.params.userId;
  Learners.learnerFetchAppointment(req, res, userId);
});


router.get('/learner/users/:userId/perferences', function(req, res){
  var userId = req.params.userId;
  Learners.learnerFetchPreferences(req, res, userId);
});





router.post('/learner/test', function(req, res){
  var userInfo = req.email;
  Users.checkUsersExistance(req, res, userInfo);
});


module.exports = router;
