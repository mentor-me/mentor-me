var db    = require('../db/db.js');
var async = require('async');


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
              // console.log("after each", user)

          })
        })
        .then(function(user){
          res.status(200).send(user)
        })
      })
      .catch(function(err){
          console.error(err.message);
          res.status(500).send(err.message);
      });
};


exports.mentorFetchedById = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          res.status(200).send(user);
        })
        .catch(function (err) {
                console.error("mentor Fetch by Id", err.message);
                res.status(500).send(err.message);

        });

}

exports.learnerFetchQualities = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          user.getQuality()
          .then(function(quality){
            res.status(200).send(quality);
          })
          .catch(function (err) {
                  console.error("Mentor Quality", err.message);
                  res.status(500).send(err.message);

          })
        })
        .catch(function (err) {
                console.error("learner Prefernces", err.message);
                res.status(500).send(err.message);

        });

}

exports.mentorFetchAppointment = function(req, res, userId){
  console.log("inside learnerFetchAppointment")
  db.Appointment.findAll({
        where: {mentorId: userId}
  })
  .then(function(appointments){
    res.status(200).send(appointments)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}

exports.mentorUpdateAppointment = function(req, res, appointment, appId){
    db.Appointment.update(appointment, {
      where: { id: appId }
    })
    .then(function() {
      res.status(200).send('Appointment '+ appId + ' update success');
    })
    .catch(function(err) {
      res.status(500).send('Appointment '+ appId + ' update failed');
    });

}
