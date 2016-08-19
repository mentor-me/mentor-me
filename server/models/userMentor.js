var db    = require('../db/db.js');
var async = require('async');


// exports.mentorCreate = function(req, res, newUser, skills, qualities) {
//     console.log("line 45: create mentor", newUser);
//     db.User.create(newUser)
//       .then(function(user){
//         var userRecord = user;
//         var skillsArr = [];
//         console.log("funtion ::::: ", user.setQuality);
//         console.log("the qULITES PARAMS", qualities)
//         user.createQuality(qualities, user.id)
//         .then(function(quality){
//             console.log("user quaities set", quality)
//
//             async.eachSeries(skills, function(skill, callback) {
//               db.Skill.findOrCreate({
//                   where: {
//                       title: skill
//                   }
//               })
//               .then(function(result) {
//                   skillsArr.push(result[0].dataValues.id);
//                   callback()
//               })
//               .then(function(){
//                   userRecord.setSkills(skillsArr, userRecord.id)
//               })
//               // console.log("after each", user)
//
//           })

//         })
//         .then(function(user){
//           res.status(200).send(user)
//         })
//       })
//       .catch(function(err){
//           console.error(err.message);
//           res.status(500).send(err.message);
//       });
// };


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

exports.mentorIncrementTotalVisits = function(req, res, userId){
    db.User.findById(userId)
    .then(function(user){
      var totalVisit = user.totalVisit + 1
      user.update({ totalVisit: totalVisit})
      .then(function(result){
        res.status(200).send("Total Visits have been updated to" + totalVisit)
      })
    })
    .catch(function(err){
      console.error(err.message);
      res.status(500).send(err.message);
    })

}

exports.mentorUpdateProfile = function(req, res, profileUpdate, qualities, mentorId){
  db.User.update( profileUpdate,
      { where: { id: mentorId }
      , returning:true}
    )
    .then(function (result) {
        console.log("This is the learner updated", JSON.stringify(result[1]));
        db.Quality.update( qualities,
            { where: { mentorId: mentorId }
            , returning:true}
          )
      })
      .then(function(result){
        res.status(200).send("User and their preferences have been updated")
      })
}

///////////////////////////////////////////////////
///////////          REVIEWS         //////////////
///////////////////////////////////////////////////

exports.fetchMentorsReviews = function(req, res, userId) {
  db.Review.findAll({
      where: {
        mentorId: userId
      },
    })
    .then(function(reviews){
      res.status(200).send(reviews)
    })
    .catch(function(err){
      console.error(err.message);
      res.status(500).send(err.message);
    })
}


///////////////////////////////////////////////////
///////////        QUALITIES         //////////////
///////////////////////////////////////////////////

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

///////////////////////////////////////////////////
///////////        APPOINTMENT       //////////////
///////////////////////////////////////////////////

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
      res.status(200).send('Appointment '+ appId + ' update successfully');
    })
    .catch(function(err) {
      res.status(500).send('Appointment '+ appId + ' update failed');
    });

}

exports.mentorDeleteAppointment = function(req, res, appId){
    db.Appointment.findById(appId)
    .then(function(appRecord) {
      appRecord.destroy();
      res.status(200).send('Appointment '+ appId + ' deleted successfully');
    })
    .catch(function(err) {
      res.status(500).send('Appointment '+ appId + ' deleted failed');
    });

}
