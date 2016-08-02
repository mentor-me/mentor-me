var db               = require('../db/db.js');
var configAuth       = require('./auth.js');
var passport         = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var JwtStrategy      = require('passport-jwt').Strategy;
var ExtractJwt       = require('passport-jwt').ExtractJwt;
var jwt              = require('jwt-simple');


var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Auth'),
  secretOrKey   : configAuth.tokenSecret
};


// var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
// //see if user ID exisits in the database
// // pass it to done with USER
// // done with out a user object
// console.log("This is the Auth token  ::::" )
//   db.User.findById(payload.sub)
//       .then(function(user){
//         console.log(user)
//         if(!user) {
//           return done(null , false, { message: 'Incorrect credentials.' })
//         } else {
//           return done (null, user);
//         }
//
//         // res.status(200).send(user);
//       })
//       .catch(function (err) {
//               console.error("learner Fetch by Id", err.message);
//               res.status(500).send(err.message);
//
//       });
//
//
// });
//
// passport.use(jwtLogin);

// module.exports = function(passport) {
//
//   passport.use(new LinkedInStrategy({
//       consumerKey: configAuth.consumerKey,
//       consumerSecret: configAuth.callbackURL,
//       callbackURL: configAuth.callbackURL
//     },
//     function(token, tokenSecret, profile, done) {
//       console.log("linkedIn profile", profile); }
      // db.User.findOrCreate({
      //   where: { linkedinId: profile.id },defaults: {job: 'something else'}}
      // })
      // .spread(function(user, created) {
      //   res.status(200).send(user)
      // })
      // .catch(function(err){
      //     console.error(err.message);
      //     res.status(500).send(err.message);
      // });

//
//   ));
//
// }
