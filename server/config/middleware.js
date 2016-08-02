var jwt         = require('jwt-simple');
var db          = require('../db/db.js');
var configAuth  = require('./auth.js');


exports.jwtLogin =  function(req, res, next){
  var token = req.get('Auth');
  var user = jwt.decode(token, configAuth.tokenSecret);

  db.User.findById(user.id)
      .then(function(user){
        console.log(user)
        if(!user) {
          res.status(500).send("User doesn't exisit");
        } else {
          next()
        }

        // res.status(200).send(user);
      })
      .catch(function (err) {
              console.error("learner Fetch by Id", err.message);
              res.status(500).send(err.message);

      });


};
