import _ from 'lodash';


function getScore(reviewCount, rating) {

  if( reviewCount === 0 || rating === 0 ){
    return 0;
  } else {

    var scoreReviewCount = 9;
    var maxReviewCount   = 10000;
    var maxReviewScore   = 5;

  	if (reviewCount > maxReviewCount) {
  		throw new Error('too many reviews');
  	}
    // return rating * 4;
  	return ( scoreReviewCount * 0.2 * (reviewCount / maxReviewCount) ) +
  		     ( scoreReviewCount * 0.7 * (rating / maxReviewScore));
  }
}


exports.mentorSortPrefs = function(preferences, mentors) {

  //console.log("beginning of sort Al", mentors)
  var sortedList = [];
  var keyArr = [];
  var mentorBySortScore = []
  _.forEach(mentors, function(mentor, i ){
    //console.log("This is in mentors sort", mentor)
    var score = 0;
    if(preferences.visual === mentor.Quality.visual){
      score += 10;
    }
    //console.log("This is in mentors sort ",i,  mentor)

    if(preferences.academic === mentor.Quality.academic){
      score += 10;
    }
    //console.log("this is score above::" , score)

    var reviewCount        = !!mentor.reviewCount ? mentor.reviewCount : 0;
    var total_appointments = !!mentor.total_appointments ? mentor.total_appointments : 0;
    var rating             = !!mentor.rating ? mentor.rating : 0;

    var reviewScore = getScore(reviewCount, rating);
    var appointmentScore   = total_appointments !== 0 ? (reviewCount / total_appointments) : 0 ;
    score = Math.floor((score + reviewScore + appointmentScore) * 1000);
    //console.log("score for user ", score, mentor.firstname)

    //console.log("this is the score after:: ",score)
    var exists = false;
    _.forEach(sortedList, function(scoreObj){
     if(_.hasIn(scoreObj, score)){
        exists = true;
        scoreObj[score].push(mentor);
     }
    })
    if(!exists){
      var temp = {};
      temp[score] =  [mentor]
      sortedList.push(temp);
      keyArr.push(score);
    }
  })
  //console.log("this is the sorted list looping ", sortedList.length )

  //console.log("this is the Key ARR ::", keyArr);
  var keySortArr = keyArr.sort(function(a, b) {
    return b - a;
  });
  //console.log("this is the sorted array", keySortArr)
  _.forEach(keySortArr, function(key){
    _.forEach(sortedList, function(scoreObj){
      // //console.log("This scoreObj",JSON.stringify(scoreObj, null , 4));
      if(scoreObj[key]){
        //console.log("im in here ", scoreObj[key])
        mentorBySortScore = _.concat(mentorBySortScore, scoreObj[key]);

      }
    })

  })
  //console.log("this is the return form SORT :: ",mentorBySortScore)
  return mentorBySortScore;
}

exports.mentorSearchByTerm = function(mentors, term){
  // //console.log("line 58: list of found mentors by term", mentors);
  term = term.toLowerCase();
  //console.log("this is term", term);
  var filterMentor = _.filter(mentors, function(mentor){
    var found = false;
    if(mentor.firstname && mentor.lastname &&_.includes((mentor.firstname + " " + mentor.lastname).toLowerCase(), term)){
      return true;
    }
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
      //console.log('skill.tite: ', skill.title);
      if(_.includes(skill.title.toLowerCase(), term)){
        found = true;
      }
    })

    //console.log('found: ', found);
    if(found){
      return true;
    }
  })
  return filterMentor;
}
