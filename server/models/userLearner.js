var db = require('../db/db.js');
var async = require('async');
//
// exports.learnerCreate = function(req, res, newUser, skills, preferences) {
//     console.log("line 5: create learner", newUser);
//     db.User.create(newUser)
//       .then(function(user){
//         user.createPreference(preferences, user.id)
//         .then(function(preference){
//             // console.log("user perferences set", preference)
//           return user;
//         })
//         .then(function(user){
//           var token = user.generateToken('auth');
//           console.log("this after preferences :::::: ", token);
//           res.status(200)
//               .header('Auth', token)
//               .header('currentUser', user.id)
//               .send({token: token, currentUser: user.id})
//         })
//       })
//       .catch(function(err){
//           console.error(err.message);
//           res.status(500).send(err.message + " Username and Email must be unique");
//       });
// };



exports.learnerFetchedById = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          res.status(200).send(user);
        })
        .catch(function (err) {
                console.error("learner Fetch by Id", err.message);
                res.status(500).send(err.message);

        });

}

exports.learnerFetchPreferences = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          user.getPreference()
          .then(function(preference){
            res.status(200).send(preference);
          })
          .catch(function (err) {
                  console.error("learner Prefernces", err.message);
                  res.status(500).send(err.message);

          })
        })
        .catch(function (err) {
                console.error("learner Prefernces", err.message);
                res.status(500).send(err.message);

        });

}

exports.learnerUpdatePreferences = function(req, res, preferenceUpdate){
  var preId = preferenceUpdate.id
  db.Preference.update(preferenceUpdate,{ where: { id: preId }, returning:true})
    .then(function (result) {
        console.log("line 69:  model", JSON.stringify(result[1]));
        res.status(200).send(result[1]);
      });

}

exports.learnerSearchMentors = function(req, res, term){
  db.User.findAll({
      where: {
        $or: [

          { username       : { $like: '%' + term + '%'}},
          { firstname      : { $like: '%' + term + '%'}},
          { lastname       : { $like: '%' + term + '%'}},
          { email          : { $like: '%' + term + '%'}},
          { phone          : { $like: '%' + term + '%'}},
          { description    : { $like: '%' + term + '%'}}
          // {'$skills.title$': { $like: '%' + term + '%'}}
        ]
      }
      // include : [{
      //              model : db.Skill, {through: 'UserSkills'},
      //              as: 'skills'
      //           }]
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


exports.learnerFetchMentors = function(req, res){

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

exports.learnerScheduleAppointment = function(req, res, appointment){
  console.log("inside learnerScheduleAppointment", appointment)
  db.Appointment.create(appointment)
  .then(function(appointment){
    res.status(200).send(appointment)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}


exports.learnerFetchAppointment = function(req, res, userId){
  console.log("inside learnerFetchAppointment")
  db.Appointment.findAll({
        where: {learnerId: userId}
  })
  .then(function(appointments){
    res.status(200).send(appointments)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}
exports.learnerUpdateAppointment = function(req, res, appointment, appId){
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

exports.learnerDeleteAppointment = function(req, res, appId){
    db.Appointment.findById(appId)
    .then(function(appRecord) {
      appRecord.destroy();
      res.status(200).send('Appointment '+ appId + ' deleted successfully');
    })
    .catch(function(err) {
      res.status(500).send('Appointment '+ appId + ' deleted failed');
    });

}
