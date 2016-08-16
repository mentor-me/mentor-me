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

  res.send({ hi: 'there' });
});

router.get('/allMentors', function(req, res) {
  var MentorsALL = Learners.allMentors(req, res);
  console.log(MentorsALL)
});

router.put('/logout/:userId', function(req, res){
  var userId = req.params.userId;
  var avaiable   = false;
  Auth.userLogout(req, res, userId, avaiable)

});



router.put('/login', function(req, res){
  console.log("this is the req in /login ", req.body)
  var loginUser = _.pick(req.body, 'email', 'password', 'lastLogIn','availability');
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
                'rate', 'description', 'availability',
                'lastLogIn'
                );
  var skills             = req.body.skills;
  var preferences        = req.body.preferences;
  newUser.secondary_role = req.body.secondary_role;

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

router.put('/mentor/login', function(req, res){
  console.log("this is the req in /login ", req.body);
  var loginUser = _.pick(req.body, 'email', 'password', 'lastLogIn','availability');
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
                'rate', 'description', 'availability',
                'lastLogIn'
                );
  var skills             = req.body.skills;
  var qualities          = req.body.qualities;
  newUser.primary_role   = req.body.primary_role;

  db.User.findOne({
    where:
    { email: newUser.email }
    })
    .then(function(user, err){
      console.log("user", user, "error", err)
      if(!user){
        Auth.mentorCreate(req, res, newUser, skills, qualities);
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

router.put('/learner/:userId/becomeAmentor', function(req, res){
  var userUpdate     = _.pick(req.body, 'description', 'primary_role');
  var skills         = req.body.skills
  var qualities      = req.body.qualities;
  var userId         = req.params.userId;

  qualities.mentorId = userId;
  Auth.mentorUpdate(req, res, userUpdate, qualities, skills, userId)

})

router.put('/mentor/:userId/becomeAlearner', function(req, res){
  var preferences     = req.body.preferences;
  var userId          = req.params.userId;
  var secondary_role  = "2";
  preferences.learnerId = userId;
  Auth.learnerUpdate(req, res, preferences, secondary_role, userId)

})


module.exports = router;
