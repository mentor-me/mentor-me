var bcrypt    = require('bcrypt');
var _         = require('lodash');
var cryptojs  = require('crypto-js');
var Sequelize = require('sequelize');
var config    = require('../config/config.js');


var sequelize = new Sequelize(config.pgUri);


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });



///////////////////////////////////////////////////
///////////          ROLES           //////////////
///////////////////////////////////////////////////

var Role = sequelize.define('Role', {
  type         : Sequelize.STRING,
  description  : Sequelize.STRING

  },{
   tableName :'Roles', // this will define the table's name
   timestamps: true   // this will activate the timestamp columns
 });


///////////////////////////////////////////////////
///////////          USER            //////////////
///////////////////////////////////////////////////

var User = sequelize.define('User', {
    username           :  {
      type: Sequelize.STRING,
          unique   : true,
          allowNull: false,
          validate : {
              notEmpty: true
          }
    },
    firstname          : Sequelize.STRING,
    lastname           : Sequelize.STRING,
    phone              : Sequelize.STRING,
    skype_name         : Sequelize.STRING,
    city               : Sequelize.STRING,
    zip                : {
      type: Sequelize.STRING,
        validate: {
          notEmpty : true
        }
    },
    primary_role       : Sequelize.STRING,
    sedondary_role     : Sequelize.STRING,
    rating             : Sequelize.STRING,
    total_appointments : Sequelize.INTEGER,
    rate               : Sequelize.REAL,
    description        : Sequelize.STRING,
    availability       : Sequelize.BOOLEAN,
    email              : {
      type: Sequelize.STRING,
          allowNull: false,
          unique   : true,
          validate :{
              isEmail : true,
              notEmpty: true
      }
    },
    passwordHash: {
      type: Sequelize.STRING
    },
    password  : {
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
          len: [7,100]
      }
    }
  },{
    tableName :'Users', // this will define the table's name
    timestamps: true   // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////          REVIEWS         //////////////
///////////////////////////////////////////////////

var Review = sequelize.define('Review', {
  content      : Sequelize.TEXT,
  description  : Sequelize.STRING,
  rating       : Sequelize.STRING
  },{
    tableName :'Reviews', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
 });

 ///////////////////////////////////////////////////
 ///////////       CONVERSATIONS      //////////////
 ///////////////////////////////////////////////////

 var Conversation = sequelize.define('Conversation', {
    name: Sequelize.TEXT,
  },{
    tableName: 'Conversations', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////        MESSAGES          //////////////
///////////////////////////////////////////////////

var Messages = sequelize.define('Messages', {
  content: Sequelize.TEXT,
  },{
    tableName: 'Messages', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////          SKILLS          //////////////
///////////////////////////////////////////////////


var Skill = sequelize.define('Skill', {
  title: Sequelize.STRING,
  },{
    tableName: 'Skills', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////       SKILLS LEVEL       //////////////
///////////////////////////////////////////////////


var SkillLevel = sequelize.define('SkillLevel', {
  title: Sequelize.STRING,
  },{
    tableName: 'SkillLevels', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});


///////////////////////////////////////////////////
///////////        PERFERENCES       //////////////
///////////////////////////////////////////////////

var Preference = sequelize.define('Preference', {
  visual     : Sequelize.BOOLEAN,
  academic   : Sequelize.BOOLEAN,
  remote     : Sequelize.BOOLEAN,
  inPerson   : Sequelize.BOOLEAN
  },{
    tableName: 'Preferences', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////         QUALITIES        //////////////
///////////////////////////////////////////////////

var Quality = sequelize.define('Quality', {
  visual     : Sequelize.BOOLEAN,
  academic   : Sequelize.BOOLEAN,
  remote     : Sequelize.BOOLEAN,
  inPerson   : Sequelize.BOOLEAN
  },{
    tableName: 'Qualities', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////        Categories        //////////////
///////////////////////////////////////////////////

var Category = sequelize.define('Category', {
  title: Sequelize.STRING
  },{
    tableName: 'Categories', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});

///////////////////////////////////////////////////
///////////       Appointment        //////////////
///////////////////////////////////////////////////

var Appointment = sequelize.define('Appointment', {
  type      : Sequelize.STRING,
  startTime : Sequelize.DATE,
  endTime   : Sequelize.DATE,
  location  : Sequelize.TEXT,

  },{
    tableName: 'Appointments', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});



Appointment.belongsTo(User, {foreignKey: 'learnerId'});
Appointment.belongsTo(User, {foreignKey: 'mentorId'});

Quality.belongsTo(User, {foreignKey: 'mentorId'});
Preference.belongsTo(User, {foreignKey: 'learnerId'});

Skill.belongsTo(SkillLevel, {foreignKey: 'skillLevelId'});
Skill.belongsTo(User, {foreignKey: 'mentorId'});

Review.belongsTo(User, {foreignKey: 'learnerId'});
Review.belongsTo(User, {foreignKey: 'mentorId'});

Conversation.belongsTo(User, {foreignKey: 'learnerId'});
Conversation.belongsTo(User, {foreignKey: 'mentorId'});


// sequelize.sync().then(function(){
//    console.log("Created tables in db.js");
// });


// will drop the tables and init them
sequelize.sync({force:true}).then(function(){
   console.log("Created tables in db.js");
});

/// Exports to models
exports.User   = User;
exports.Review = Review;
exports.Role   = Role;
