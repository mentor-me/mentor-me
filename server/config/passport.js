var db               = require('../db/db.js');
var configAuth       = require('./auth.js');
var passport         = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var JwtStrategy      = require('passport-jwt').Strategy;
var ExtractJwt       = require('passport-jwt').ExtractJwt;
var jwt              = require('jwt-simple');




module.exports = function(passport) {

  passport.use(new LinkedInStrategy({
      consumerKey: configAuth.consumerKey,
      consumerSecret: configAuth.consumerSecret,
      callbackURL: configAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      console.log("linkedIn profile", profile);
        db.User.findOrCreate({
          where: { linkedinId: profile.id }

        })
        .spread(function(user, created) {
          res.status(200).send(user)
        })
        .catch(function(err){
            console.error(err.message);
            res.status(500).send(err.message);
        });


}))

}
