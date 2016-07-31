var db = require('../db/db.js');


exports.userCreate = function(req, res, newUser) {
    console.log("line 6: create user", newUser);
    db.User.create(newUser)
      .then(function(user){
          console.log("line 9: User has been Created");
          res.status(200).send(user)
      })
      .catch(function(err){
          console.error(err.message);
          res.status(500).send(err.message);
      });
};



exports.userFetchMentors = function(req, res){
  db.User.findAll({
      where: {
        $or: [
          {primary_role  : "1"},
          {secondary_role: "1"}
        ]
      }
    })
    .then(function(mentors){
        console.log("line 9: User has been Created");
        res.status(200).send(mentors)
    })
    .catch(function(err){
        console.error(err.message);
        res.status(500).send(err.message);
    });



}
