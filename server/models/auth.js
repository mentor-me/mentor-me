var db     = require('../db/db.js');
var bcrypt = require('bcrypt');
var async  = require('async');

exports.learnerCreate = function(req, res, newUser, skills, preferences) {
    console.log("line 5: create learner", newUser);
    db.User.create(newUser)
      .then(function(user){
        user.createPreference(preferences, user.id)
        .then(function(preference){
            // console.log("user perferences set", preference)
          return user;
        })
        .then(function(user){
          var token = user.generateToken('auth');
          console.log("this after preferences :::::: ", token);
          res.status(200)
              .header('Auth', token)
              .header('currentUser', user.id)
              .send(user)
        })
      })
      .catch(function(err){
          console.error(err.message);
          res.status(500).send(err.message + " Username and Email must be unique");
      });
};

exports.learnerLogin = function(req, res, loginUser){
  console.log("this is the user login ::", loginUser)
  db.User.findOne({
    where: {
        email: loginUser.email
    }})
    .then(function(user){
    console.log("this is the user from the login router ", user)
      if(!user || !bcrypt.compareSync(loginUser.password, user.get('passwordHash'))){
          return res.status(401).send();
      }

      var token = user.generateToken('authentication');
    if(token){
        res.status(200)
            .header('Auth', token)
            .header('currentUser', user.id)
            .send(user)
    }
    else
    {
        res.status(401).send();
    }

    })
    .catch(function(err){
        res.status(500).send(err.message);
    })



}

exports.mentorCreate = function(req, res, newUser, skills, qualities) {
    console.log("line 45: create mentor", newUser);
    db.User.create(newUser)
      .then(function(user){
        var userRecord = user;
        var skillsArr = [];
        console.log("funtion ::::: ", user.setQuality);
        console.log("the qULITES PARAMS", qualities)
        user.createQuality(qualities, user.id)
        .then(function(quality){
            console.log("user quaities set", quality)

            async.eachSeries(skills, function(skill, callback) {
              db.Skill.findOrCreate({
                  where: {
                      title: skill
                  }
              })
              .then(function(result) {
                  skillsArr.push(result[0].dataValues.id);
                  callback()
              })
              .then(function(){
                  userRecord.setSkills(skillsArr, userRecord.id)
              })

          })
          return user;
        })
        .then(function(user){
          var token = user.generateToken('auth');
          console.log("this after preferences :::::: ", token);
          res.status(200)
          .header('Auth', token)
          .header('currentUser', user.id)
          .send(user)
        })
      })
      .catch(function(err){
          console.error(err.message);
          res.status(500).send(err.message);
      });
};



exports.mentorLogin = function(req, res, loginUser){
  console.log("this is the user login ::", loginUser)
  db.User.findOne({
    where: {
        email: loginUser.email
    }})
    .then(function(user){
    console.log("this is the user from the login router ", user)
      if(!user || !bcrypt.compareSync(loginUser.password, user.get('passwordHash'))){
          return res.status(401).send();
      }

      var token = user.generateToken('authentication');
    if(token){
        res.status(200)
            .header('Auth', token)
            .header('currentUser', user.id)
            .send(user)
    }
    else
    {
        res.status(401).send();
    }

    })
    .catch(function(err){
        res.status(500).send(err.message);
    })



}
