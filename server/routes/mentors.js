var router   = require("express").Router();
var _        = require('lodash');
var Users    = require('../models/user');
var Mentors  = require('../models/userMentor');

router.get('/mentor' , function(req, res){
  console.log('/mentor')
});

router.post('/mentor/users', function(req, res){
  console.log('learner/users');
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip', 'primary_role',
                'secondary_role', 'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );
  var skills   = req.body.skills
  var qualites = req.body.qualites

  Mentors.mentorCreate(req, res, newUser, skills, qualites);
});


router.get('/mentor/users/:userId', function(req, res){
  var userId = req.params.userId;
  Mentors.mentorFetchedById(req, res, userId);
});

router.put('/mentor/users/:userId/visited', function(req, res){
  var userId = req.params.userId;
  Mentors.mentorIncrementTotalVisits(req, res, userId);
});

router.put('/mentor/users/:userId', function(req, res){
  var mentorId = req.params.userId;
  var profileUpdate = _.pick(req.body, 'username', 'firstname',
  'lastname', 'email', 'password', 'phone',
  'skype_name', 'city', 'zip',
  'description'
  );
  var qualities = req.body.qualities
  Mentors.mentorUpdateProfile(req, res, profileUpdate, qualities, mentorId);
});

router.get('/mentor/users/:userId/qualities', function(req, res){
  var userId = req.params.userId;
  Mentors.learnerFetchQualities(req, res, userId);
});



///////////////////////////////////////////////////
///////////          REVIEWS         //////////////
///////////////////////////////////////////////////

router.get('/mentor/users/:userId/reviews', function(req, res){
  var userId = req.params.userId;
  Mentors.fetchMentorsReviews(req, res, userId);
});

///////////////////////////////////////////////////
///////////        APPOINTMENT       //////////////
///////////////////////////////////////////////////


router.get('/mentor/users/:userId/appointments', function(req, res){
  var userId = req.params.userId;
  Mentors.mentorFetchAppointment(req, res, userId);
});


router.put('/mentor/users/:userId/appointment/:appId', function(req, res){
  var appId = req.params.appId;
  var appointment = _.pick(req.body, 'notes', 'startTime', 'endTime',
                    'location', 'subject');
  Mentors.mentorUpdateAppointment(req, res, appointment, appId);
});

router.delete('/mentor/users/:userId/appointment/:appId', function(req, res){
  var appId = req.params.appId;
  Mentors.mentorDeleteAppointment(req, res, appId);
});


//////////////////////////////////////////////////////////
module.exports = router;
