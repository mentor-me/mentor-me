var faker = require('faker')
var userLearner = require('../models/userLearner')
var axios = require('axios');

var userId = Math.floor(Math.random() * 50) + 1
var mentorId = Math.floor(Math.random() * 4) + 1

// buildLearnerUser(10)
 buildMentorUser(5)
// buildAppointmentData(5)
// buildReviewData(5)


function getAppointmentDummyObj() {

  var appointment = {
      notes          : faker.Lorem.sentence(),
      startTime      : "2016-08-01 00:45:00.167+00",
      endTime        : "2016-08-01 00:48:00.167+00",
      location       : faker.Lorem.sentence(),
      mentorId       : Math.floor(Math.random() * 6) + 1
  }
  return appointment;
};



function getMentorDummyObj() {

  var mentorUser = {
      username       : faker.Internet.userName(),
      firstname      : faker.Name.firstNameFemale(),
      lastname       : faker.Name.lastName(),
      availability    : true,
      email          : faker.Internet.email(),
      password       : faker.Internet.userName(),
      description    : " some description",
      skills         : ["lovemaking", "riding dirty"],
      zip            : faker.Address.zipCode(),
      primary_role   : "1",
      lastLogIn      : faker.Date.recent(),
      qualities    : {
          visual     : true,
          academic   : false,
          remote     : true,
          inPerson   : true
      }
  }
  return mentorUser;

};


// let data = {
//   username: loginProps.username,
//   firstname: loginProps.firstname,
//   lastname: loginProps.lastname,
//   availability: true,
//   email: loginProps.email,
//   password: loginProps.password,
//   zip: loginProps.zipCode,
//   secondary_role: "2",
//   lastLogIn: new Date(),
//   preferences: {
//     visual: loginProps.learnerStyle[0] == "Visual" ? 'true' : 'false',
//     academic: loginProps.learnerStyle[1] == "Academic" ? 'true' : 'false',
//     remote: loginProps.meetingFormat[0] == "Remote" ? 'true' : 'false',
//     inPerson: loginProps.meetingFormat[1] == "In Person" ? 'true' : 'false'
//   }
// }

function getLearnerDummyObj() {

  var learnerUser = {
        username       : faker.Internet.userName(),
        firstname      : faker.Name.firstNameFemale(),
        lastname       : faker.Name.lastName(),
        availability   : true,
        email          : faker.Internet.email(),
        password       : faker.Internet.userName(),
        secondary_role : "2",
        lastLogIn      : new Date(),
        skills         : faker.Lorem.words(),
        preferences    : {
            visual     : true,
            academic   : false,
            remote     : true,
            inPerson   : true
        }
  }
  return learnerUser;
}

function getReviewDummyObj() {

  var review = {
          content       : "faker.Lorem.sentence()",
          rating        : 4,
          mentorId      : "208"
  }
  return review;

}

        // -----------------BUILD FUNCTIONS----------------

function buildAppointmentData(qty) {
    for (var i = 0; i < qty; i++) {

    var appointmentObj = getAppointmentDummyObj()

    const endpoint = `http://localhost:3000/api/learner/users/3/appointment`;

      axios.post(endpoint, appointmentObj)
        .then(response => {

          console.log('created dummy data appointments');
        })
        .catch((error) => {
          console.log('in catch err buildAppointmentData ');
        });

    }
};


function buildReviewData(qty) {
    for (var i = 0; i < qty; i++) {

      var reviewObj = {
              content       : "faker.Lorem.sentence()",
              rating        : 4,
              mentorId      : "208"
      }
    // Todo: update after rebasing with new backend code
    // var reviewObj = getReviewDummyObj()

    const endpoint = `http://localhost:3000/api/learner/users/3/review`;

      axios.post(endpoint, reviewObj)
        .then(response => {
          console.log('created dummy data REVIEWS');
        })
        .catch((error) => {
          console.log('in catch err ', error);
        });

    }
};


function buildLearnerUser(qty) {

    for (var i = 0; i < qty; i++) {

      var userObj = getLearnerDummyObj()

      var endpoint=`http://localhost:3000/api/signup`;

        axios.post(endpoint, userObj)
          .then(response => {

            console.log('created dummy data users');
          })
          .catch((error) => {
            console.log('in catch err ', error);
          });

    }
};


function buildMentorUser(qty) {
    for (var i = 0; i < qty; i++) {

    console.log('created dummy data mentor users', mentorObj);
    var mentorObj = getMentorDummyObj()

    const endpoint=`http://localhost:3000/api/mentor/signup`;

      axios.post(endpoint, mentorObj)
        .then(response => {
          console.log('actually created dummy data mentor users');
        })
        .catch((error) => {
          console.log('in catch err ', error);
        });

    }
};



var skillz1 = ['Accounting',
'Airlines/Aviation',
'Alternative Dispute Resolution',
'Alternative Medicine',
'Animation',
'Apparel & Fashion',
'Architecture & Planning',
'Arts and Crafts',
'Automotive',
'Aviation & Aerospace',
'Banking',
'Biotechnology',
'Broadcast Media',
'Building Materials',
'Business Supplies and Equipment',
'Capital Markets',
'Chemicals',
'Civic & Social Organization',
'Civil Engineering',
'Commercial Real Estate',
'Computer & Network Security',
'Computer Games',
'Computer Hardware',
'Computer Networking',
'Computer Software',
'Construction',
'Consumer Electronics',
'Consumer Goods',
'Consumer Services',
'Cosmetics',
'Dairy',
'Defense & Space',
'Design',
'Education Management',
'E-Learning',
'Electrical/Electronic Manufacturing',
'Entertainment',
'Environmental Services',
'Events Services',
'Executive Office',
'Facilities Services',
'Farming',
'Financial Services',
'Fine Art',
'Fishery',
'Food & Beverages',
'Food Production',
'Fund-Raising',
'Furniture',
'Gambling & Casinos',
'Glass, Ceramics & Concrete',
'Government Administration',
'Government Relations',
'Graphic Design',
'Health, Wellness and Fitness',
'Higher Education',
'Hospital & Health Care',
'Hospitality',
'Human Resources',
'Import and Export',
'Individual & Family Services',
'Industrial Automation',
'Information Services',
'Information Technology and Services',
'Insurance',
'International Affairs',
'International Trade and Development',
'Internet',
'Investment Banking',
'Investment Management',
'Judiciary',
'Law Enforcement',
'Law Practice',
'Legal Services',
'Legislative Office',
'Leisure, Travel & Tourism',
'Libraries',
'Logistics and Supply Chain',
'Luxury Goods & Jewelry',
'Machinery',
'Management Consulting',
'Maritime',
'Market Research',
'Marketing and Advertising',
'Mechanical or Industrial Engineering',
'Media Production',
'Medical Devices',
'Medical Practice',
'Mental Health Care',
'Military',
'Mining & Metals',
'Motion Pictures and Film',
'Museums and Institutions',
'Music',
'Nanotechnology',
'Newspapers',
'Non-Profit Organization Management',
'Oil & Energy',
'Online Media',
'Outsourcing/Offshoring',
'Package/Freight Delivery',
'Packaging and Containers',
'Paper & Forest Products',
'Performing Arts',
'Pharmaceuticals',
'Philanthropy',
'Photography',
'Plastics',
'Political Organization',
'Primary/Secondary Education',
'Printing',
'Professional Training & Coaching',
'Program Development',
'Public Policy',
'Public Relations and Communications',
'Public Safety',
'Publishing',
'Railroad Manufacture',
'Ranching',
'Real Estate',
'Recreational Facilities and Services',
'Religious Institutions',
'Renewables & Environment',
'Research',
'Restaurants',
'Retail',
'Security and Investigations',
'Semiconductors',
'Shipbuilding',
'Sporting Goods',
'Sports',
'Staffing and Recruiting',
'Supermarkets',
'Telecommunications',
'Textiles',
'Think Tanks',
'Tobacco',
'Translation and Localization',
'Transportation/Trucking/Railroad',
'Utilities',
'Venture Capital & Private Equity',
'Veterinary',
'Warehousing',
'Wholesale',
'Wine and Spirits',
'Wireless',
'Writing and Editing'
];



var skillz2 = ['Accounting',
'Airlines/Aviation',
'Alternative Dispute Resolution',
'Alternative Medicine',
'Animation',
'Apparel & Fashion',
'Architecture & Planning',
'Arts and Crafts',
'Automotive',
'Aviation & Aerospace',
'Banking',
'Biotechnology',
'Broadcast Media',
'Building Materials',
'Business Supplies and Equipment',
'Capital Markets',
'Chemicals',
'Civic & Social Organization',
'Civil Engineering',
'Commercial Real Estate',
'Computer & Network Security',
'Computer Games',
'Computer Hardware',
'Computer Networking',
'Computer Software',
'Construction',
'Consumer Electronics',
'Consumer Goods',
'Consumer Services',
'Cosmetics',
'Dairy',
'Defense & Space',
'Design',
'Education Management',
'E-Learning',
'Electrical/Electronic Manufacturing',
'Entertainment',
'Environmental Services',
'Events Services',
'Executive Office',
'Facilities Services',
'Farming',
'Financial Services',
'Fine Art',
'Fishery',
'Food & Beverages',
'Food Production',
'Fund-Raising',
'Furniture',
'Gambling & Casinos',
'Glass, Ceramics & Concrete',
'Government Administration',
'Government Relations',
'Graphic Design',
'Health, Wellness and Fitness',
'Higher Education',
'Hospital & Health Care',
'Hospitality',
'Human Resources',
'Import and Export',
'Individual & Family Services',
'Industrial Automation',
'Information Services',
'Information Technology and Services',
'Insurance',
'International Affairs',
'International Trade and Development',
'Internet',
'Investment Banking',
'Investment Management',
'Judiciary',
'Law Enforcement',
'Law Practice',
'Legal Services',
'Legislative Office',
'Leisure, Travel & Tourism',
'Libraries',
'Logistics and Supply Chain',
'Luxury Goods & Jewelry',
'Machinery',
'Management Consulting',
'Maritime',
'Market Research',
'Marketing and Advertising',
'Mechanical or Industrial Engineering',
'Media Production',
'Medical Devices',
'Medical Practice',
'Mental Health Care',
'Military',
'Mining & Metals',
'Motion Pictures and Film',
'Museums and Institutions',
'Music',
'Nanotechnology',
'Newspapers',
'Non-Profit Organization Management',
'Oil & Energy',
'Online Media',
'Outsourcing/Offshoring',
'Package/Freight Delivery',
'Packaging and Containers',
'Paper & Forest Products',
'Performing Arts',
'Pharmaceuticals',
'Philanthropy',
'Photography',
'Plastics',
'Political Organization',
'Primary/Secondary Education',
'Printing',
'Professional Training & Coaching',
'Program Development',
'Public Policy',
'Public Relations and Communications',
'Public Safety',
'Publishing',
'Railroad Manufacture',
'Ranching',
'Real Estate',
'Recreational Facilities and Services',
'Religious Institutions',
'Renewables & Environment',
'Research',
'Restaurants',
'Retail',
'Security and Investigations',
'Semiconductors',
'Shipbuilding',
'Sporting Goods',
'Sports',
'Staffing and Recruiting',
'Supermarkets',
'Telecommunications',
'Textiles',
'Think Tanks',
'Tobacco',
'Translation and Localization',
'Transportation/Trucking/Railroad',
'Utilities',
'Venture Capital & Private Equity',
'Veterinary',
'Warehousing',
'Wholesale',
'Wine and Spirits',
'Wireless',
'Writing and Editing'
];



var skillz3 = ['Accounting',
'Airlines/Aviation',
'Alternative Dispute Resolution',
'Alternative Medicine',
'Animation',
'Apparel & Fashion',
'Architecture & Planning',
'Arts and Crafts',
'Automotive',
'Aviation & Aerospace',
'Banking',
'Biotechnology',
'Broadcast Media',
'Building Materials',
'Business Supplies and Equipment',
'Capital Markets',
'Chemicals',
'Civic & Social Organization',
'Civil Engineering',
'Commercial Real Estate',
'Computer & Network Security',
'Computer Games',
'Computer Hardware',
'Computer Networking',
'Computer Software',
'Construction',
'Consumer Electronics',
'Consumer Goods',
'Consumer Services',
'Cosmetics',
'Dairy',
'Defense & Space',
'Design',
'Education Management',
'E-Learning',
'Electrical/Electronic Manufacturing',
'Entertainment',
'Environmental Services',
'Events Services',
'Executive Office',
'Facilities Services',
'Farming',
'Financial Services',
'Fine Art',
'Fishery',
'Food & Beverages',
'Food Production',
'Fund-Raising',
'Furniture',
'Gambling & Casinos',
'Glass, Ceramics & Concrete',
'Government Administration',
'Government Relations',
'Graphic Design',
'Health, Wellness and Fitness',
'Higher Education',
'Hospital & Health Care',
'Hospitality',
'Human Resources',
'Import and Export',
'Individual & Family Services',
'Industrial Automation',
'Information Services',
'Information Technology and Services',
'Insurance',
'International Affairs',
'International Trade and Development',
'Internet',
'Investment Banking',
'Investment Management',
'Judiciary',
'Law Enforcement',
'Law Practice',
'Legal Services',
'Legislative Office',
'Leisure, Travel & Tourism',
'Libraries',
'Logistics and Supply Chain',
'Luxury Goods & Jewelry',
'Machinery',
'Management Consulting',
'Maritime',
'Market Research',
'Marketing and Advertising',
'Mechanical or Industrial Engineering',
'Media Production',
'Medical Devices',
'Medical Practice',
'Mental Health Care',
'Military',
'Mining & Metals',
'Motion Pictures and Film',
'Museums and Institutions',
'Music',
'Nanotechnology',
'Newspapers',
'Non-Profit Organization Management',
'Oil & Energy',
'Online Media',
'Outsourcing/Offshoring',
'Package/Freight Delivery',
'Packaging and Containers',
'Paper & Forest Products',
'Performing Arts',
'Pharmaceuticals',
'Philanthropy',
'Photography',
'Plastics',
'Political Organization',
'Primary/Secondary Education',
'Printing',
'Professional Training & Coaching',
'Program Development',
'Public Policy',
'Public Relations and Communications',
'Public Safety',
'Publishing',
'Railroad Manufacture',
'Ranching',
'Real Estate',
'Recreational Facilities and Services',
'Religious Institutions',
'Renewables & Environment',
'Research',
'Restaurants',
'Retail',
'Security and Investigations',
'Semiconductors',
'Shipbuilding',
'Sporting Goods',
'Sports',
'Staffing and Recruiting',
'Supermarkets',
'Telecommunications',
'Textiles',
'Think Tanks',
'Tobacco',
'Translation and Localization',
'Transportation/Trucking/Railroad',
'Utilities',
'Venture Capital & Private Equity',
'Veterinary',
'Warehousing',
'Wholesale',
'Wine and Spirits',
'Wireless',
'Writing and Editing'
];
//
// function randomSkill() {
//     function rando(arr) {
//         return arr[Math.floor(Math.random()*147)];
//     }
//     return rando(skillz1) + rando(skillz2) + rando(skillz3);
// }
