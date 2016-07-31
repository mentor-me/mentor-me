var db    = require('../db/db.js');
var async = require('async');



exports.checkUsersExistance = function(req, res, userInfo){

      db.User.findOne({
          where: {
              email: userInfo
          }})
          .then(function(user){
            if(!user) {
              console.log("There is no user by that email create it")

            }else {
              console.log("This is the user that I found", user)
            }

          })
          .catch(function(err){
              res.status(500).send(err.message);
          })


  }
