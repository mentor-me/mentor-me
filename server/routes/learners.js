var router = require("express").Router();
var _      = require('lodash');
var Users  = require('../models/user');


router.get('/learner', function(req, res){
  console.log("/learner");

});
router.get('/learner/mentors', function(req, res){
  console.log("/learner/mentors");
  Users.userFetchMentors(req, res);

});


router.post('/learner/users', function(req, res){
  console.log('learner/users');
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip', 'primary_role',
                'secondary_role', 'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );

  Users.userCreate(req, res, newUser);
});

router.get('learner/users/:userId', function(req, res){


});



router.get('learner/users/:userId/mentors', function(req, res){


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
