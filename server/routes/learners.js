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

router.get('/learner/users/:userId/perferences', function(req, res){
  var userId = req.params.userId;
  Learners.learnerFetchPreferences(req, res, userId);
});





router.post('/learner/test', function(req, res){
  var userInfo = req.email;
  Users.checkUsersExistance(req, res, userInfo);
});


module.exports = router;





// Study
// // GET /search?q=tobi+ferret
// req.query.q
// // => "tobi ferret"
//
// // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
// req.query.order
// // => "desc"
//
// req.query.shoe.color
// // => "blue"
//
// req.query.shoe.type
// // => "converse"
