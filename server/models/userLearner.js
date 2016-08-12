var db        = require('../db/db.js');
var Sequelize = require('sequelize');
var async     = require('async');
var _         = require('lodash');
var zipcodes  = require('zipcodes');

///////////////////////////////////////////////////
///////////    GETTING MENTORS       //////////////
///////////////////////////////////////////////////


exports.learnerSearchMentors = function(req, res, term){
  term = term.toLowerCase();
  db.User.findAll({
    where: {
      $or: [
        {primary_role  : "1"},
        {secondary_role: "1"}
      ]
    },
    include : [{
      model : db.Skill
    },
    {
      model: db.Quality
    }]

  })
  .then(function(mentors){
    // console.log("line 58: list of found mentors by term", mentors);
    console.log("this is term", term);
    var filterMentor = _.filter(mentors, function(mentor){
      var found = false;
      if(mentor.username &&_.includes(mentor.username.toLowerCase(), term)){
        return true;
      }
      if(mentor.firstname &&_.includes(mentor.firstname.toLowerCase(), term)){
        return true;
      }
      if(mentor.lastname &&_.includes(mentor.lastname.toLowerCase(), term)){
        return true;
      }
      if(mentor.email &&_.includes(mentor.email.toLowerCase(), term)){
        return true;
      }
      if(mentor.phone &&_.includes(mentor.phone.toLowerCase(), term)){
        return true;
      }
      if(mentor.description &&_.includes(mentor.description.toLowerCase(), term)){
        return true;
      }

      _.each(mentor.Skills, function(skill){
        console.log('skill.tite: ', skill.title);
        if(_.includes(skill.title.toLowerCase(), term)){
          found = true;
        }
      })

      console.log('found: ', found);
      if(found){
        return true;
      }
    })

      res.status(200).send(filterMentor)

    // _.each(filterMentor, function(mentor) {
    //   console.log("This is the filtered mentors ::", mentor.dataValues);
    // })

  })
  .catch(function(err){
    console.error('err', err.message);
    res.status(500).send(err.message);
  });
}

exports.LearnerFetchedAndFilteredMentor = function(req, res, preferences, radius) {
  console.log("this is preferences", preferences)
  if(preferences.radiusZip){
    var radius = radius || 10;
    var zipMatchArr = zipcodes.radius(preferences.radiusZip, 10);
    console.log("This is the ZIP CODE ARRAY ", zipMatchArr, "this is the zip from the user", preferences.radiusZip);
  }
  db.User.findAll({
    where: {
      $or: [
        {primary_role  : "1"},
        {secondary_role: "1"}
      ]
    },
    include : [{
      model : db.Skill
    },
    {
      model: db.Quality
    }]

  })
  .then(function(mentors){
    if(!zipMatchArr){
      res.status(200).send(mentors)
    } else {
      var filterMentors = _.filter(mentors, function(mentor){
        console.log("this is the mentors obj-----", mentor)
        console.log("this the index valei sis the ", _.indexOf(zipMatchArr , mentor.zip))
        if(_.indexOf(zipMatchArr , mentor.zip) !== -1 && mentor.Quality.inPerson === true)
        return mentor;
      })
      res.status(200).send(filterMentors)
    }


  })
  .catch(function(err){
    console.error('err', err.message);
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
    },
    include : [{
      model : db.Skill
    },
    {
      model: db.Quality
    }]

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

///////////////////////////////////////////////////
///////////    LEARNER CRUD          //////////////
///////////////////////////////////////////////////


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

exports.learnerUpdateProfile = function(req, res, profileUpdate, preference, learnerId){
  db.User.update(profileUpdate,
      { where: { id: learnerId },
      returning:true}
    )
    .then(function (result) {
        console.log("This is the learner updated", JSON.stringify(preference));
        db.Preference.update( preference,
            {
              where: { learnerId: learnerId }
            }
          )
      })
      .then(function(result){
        res.status(200).send("User and their preferences have been updated");
      })

}


///////////////////////////////////////////////////
///////////        PERFERENCES       //////////////
///////////////////////////////////////////////////


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
  console.log('preferenceUpdate---', preferenceUpdate);
  var preId = preferenceUpdate.id
  db.Preference.update(preferenceUpdate,{ where: { id: preId }})
    .then(function (result) {
      console.log("this is result on the backend ::", result)
        console.log("line 69:  model", JSON.stringify(result[1]));
        res.status(200).send(result[1]);
      });

}


///////////////////////////////////////////////////
///////////        APPOINTMENT       //////////////
///////////////////////////////////////////////////



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



///////////////////////////////////////////////////
///////////          REVIEWS         //////////////
///////////////////////////////////////////////////

exports.learnerReviewMentor = function(req, res, review){
  var mentorId = review.mentorId;
  db.Review.create(review)
  .then(function(review){
    console.log("Review has been created ", review)
    db.Review.findAll({
      where: {mentorId: mentorId}
    })
    .then(function(reviews){
      var length = reviews.length;
      console.log("this is the length of the reviews ", length);
      var totalRatings = _.reduce(reviews, function(sum, review) {
        return sum + review.rating;
      }, 0);
      var averageRating = (totalRatings/ length) * 100;
      var reviewsInfo   = { averageRating:averageRating , length: length}
      console.log("this is review info inside ", reviewsInfo)
      return reviewsInfo
    }).then(function(reviewsInfo){
      console.log("this is review info ", reviewsInfo)

      db.User.update({rating: reviewsInfo.averageRating, reviewCount: reviewsInfo.length }, {
        where: { id: mentorId }
      })
      .then(function() {
        console.log("this is the last THEN :: ", mentorId)
        res.status(200).send('Mentor Rating '+ mentorId + ' update success');
      })
    })

  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}


///////
exports.allMentors = function(req, res){
  var mentorsAll = [];
  db.User.findAll({
      where: {
        $or: [
          {primary_role  : "1"},
          {secondary_role: "1"}
        ]
      }
    })
    .then(function(mentors){
      // console.log("This is the mentors without skills", mentors)
        async.mapSeries(mentors, function(mentor, callback){

        var newMentor = mentor.dataValues;
        mentor.getSkills()
        .then(function(result) {

            newMentor.skills = result.map(function(skill){
              return skill.dataValues.title;
            });
            mentorsAll.push(newMentor);
            callback(null, mentorsAll);
         })

  },function(err, results) {
    // console.log("This is results in the 3rd arg of the MAP ", results[0]);
    res.status(200).send(results[0]);
  })
})
}



// db.User.findAll({})
//   .then(function(mentors){
//       // console.log("line 58: list of found mentors by term", mentors);
//       // res.status(200).send(mentors)
//   })
//   .catch(function(err){
//       console.error(err.message);
//       // res.status(500).send(err.message);
//   });

// db.Skill.findAll({
//   where: {
//     title: { $like: '%' + term + '%'}
//   }
// })
//   .then(function(data) {
//     _.map(data, function(item) {
//       // console.log('line 92 data: ', item.dataValues);
//     })
//   })
//
// db.User.findAll({
//     // where: {
//     //   $or: [
//     //     { username       : { $like: '%' + term + '%'}},
//     //     { firstname      : { $like: '%' + term + '%'}},
//     //     { lastname       : { $like: '%' + term + '%'}},
//     //     { email          : { $like: '%' + term + '%'}},
//     //     { phone          : { $like: '%' + term + '%'}},
//     //     { description    : { $like: '%' + term + '%'}},
//     //   ]
//     // },
//     include : [{
//                 model : db.Skill
//               }]
//   })




//
// exports.learnerCreate = function(req, res, newUser, skills, preferences) {
//     console.log("line 5: create learner", newUser);
//     db.User.create(newUser)
//       .then(function(user){
//         user.createPreference(preferences, user.id)
//         .then(function(preference){
//             // console.log("user preferences set", preference)
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
