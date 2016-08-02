var express        = require("express");
var router         = express.Router();
var passport       = require('passport');
var Auth           = require('../models/auth')
var db             = require('../db/db.js');
var _              = require('lodash');
var Learners       = require('../models/userLearner');
var configPassport = require('../config/passport');
var jwt            = require('jwt-simple');

var requireAuth    = require('../config/middleware')

router.get('/test', requireAuth.jwtLogin, function(req, res){
  console.log("I'm auth");
  res.send({ hi: 'there' });
});

// router.post('/login', function(req, res, next) {
//
//
// });
router.post('/login', function(req, res){
  console.log("this is the req in /login ", req.body)
  var loginUser = _.pick(req.body, 'email', 'password');
  // if(typeof loginUser.email !== 'string' || typeof loginUser.password  !== 'string') {
  //     return res.status(500).send();
  // }
  Auth.learnerLogin(req, res, loginUser);
});


router.post('/signup', function(req, res, next) {
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip',
                'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );
  var skills       = req.body.skills;
  var preferences  = req.body.preferences;
  var primary_role = req.body.role;

  db.User.findOne({
    where:
    { email: newUser.email }
    })
    .then(function(user, err){
      console.log("user", user, "error", err)
      if(!user){
        Auth.learnerCreate(req, res, newUser, skills, preferences);
      } else {
        return res.status(422).send({error: 'Email is in Use'})
      }

    })


});

router.post('/mentor/login', function(req, res){
  console.log("this is the req in /login ", req.body);
  var loginUser = _.pick(req.body, 'email', 'password');
  // if(typeof loginUser.email !== 'string' || typeof loginUser.password  !== 'string') {
  //     return res.status(500).send();
  // }
  Auth.mentorLogin(req, res, loginUser);
});


router.post('/mentor/signup', function(req, res, next) {
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip',
                'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );
  var skills         = req.body.skills;
  var preferences    = req.body.preferences;
  var secondary_role = req.body.role;

  db.User.findOne({
    where:
    { email: newUser.email }
    })
    .then(function(user, err){
      console.log("user", user, "error", err)
      if(!user){
        Auth.mentorCreate(req, res, newUser, skills, preferences);
      } else {
        return res.status(422).send({error: 'Email is in Use'})
      }

    })


});

router.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_fullprofile', 'r_id',
                        'r_first-name','r_lastname','r_emailaddress',
                        'r_skills',
                        'r_educations'] })
)



module.exports = router;
