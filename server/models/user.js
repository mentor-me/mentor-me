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

exports.userSearchMentors = function(req, res, term){
  db.User.findAll({
      where: {
        $or: [

          {
            username: {
              $like: '%' + term + '%'
            }
          },
          {
            firstname: {
              $like: '%' + term + '%'
            }
          },
          {
            lastname: {
              $like: '%' + term + '%'
            }
          },
          {
            email: {
              $like: '%' + term + '%'
            }
          },
          {
            phone: {
              $like: '%' + term + '%'
            }
          },
          {
            description: {
              $like: '%' + term + '%'
            }
          }

        ]
      }
      ,
      $or: [{
      include : [{
                   model : db.Skill,
                   where : { title : {
                     $like: '%' + term + '%'}
                     }
                }]
      }]
    })
    .then(function(mentors){
        console.log("line 58: list of found mentors by term");
        res.status(200).send(mentors)
    })
    .catch(function(err){
        console.error(err.message);
        res.status(500).send(err.message);
    });


}


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
        console.log("line 81: user fetch mentors");
        res.status(200).send(mentors)
    })
    .catch(function(err){
        console.error(err.message);
        res.status(500).send(err.message);
    });



}


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
