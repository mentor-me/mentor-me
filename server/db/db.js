var bcrypt      = require('bcrypt');
var _           = require('lodash');
var cryptojs    = require('crypto-js');
var Sequelize   = require('sequelize');
var config      = require('../config/config');
var configAuth  = require('../config/auth');
var jwt         = require('jwt-simple');

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

  },{
   tableName :'Roles', // this will define the table's name
   timestamps: false   // this will activate the timestamp columns
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
    secondary_role     : Sequelize.STRING,
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
    salt: {
      type: Sequelize.STRING
    },
    passwordHash: {
      type: Sequelize.STRING
    },
    password  : {
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
          len: [7,100]
      },
      set: function(value){
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(value, salt);

        this.setDataValue('password', value);
        this.setDataValue('salt', salt);
        this.setDataValue('passwordHash', hashedPassword);
      }
    },
  },{
    tableName :'', // this will define the table's name
    timestamps: true ,  // this will activate the timestamp columns
    hooks: {
      beforeValidate: function(user, options){
           if(typeof user.email === 'string'){
               user.email = user.email.toLowerCase();
        }
      }
    },
    instanceMethods: {
    generateToken: function(type){
      if(!_.isString(type)){
          return undefined;
      }
      try {
        var timeStamp = new Date().getTime();
        console.log("this is the sercertt ::::::",configAuth.tokenSecret )
        var token = jwt.encode({id: this.get('id')}, configAuth.tokenSecret);
        return token;
      } catch(err){
        return undefined;
      }
    }
  }
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

var Message = sequelize.define('Message', {
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
  notes     : Sequelize.TEXT,
  startTime : Sequelize.DATE,
  endTime   : Sequelize.DATE,
  location  : Sequelize.TEXT,

  },{
    tableName: 'Appointments', // this will define the table's name
    timestamps: true      // this will activate the timestamp columns
});


User.belongsToMany(Skill, {through: 'UserSkills', foreignKey: 'mentorId'});
Skill.belongsToMany(User, {through: 'UserSkills', foreignKey: 'skillId'});

User.hasMany(Review, {foreignKey: 'learnerId'});
User.hasMany(Review, {foreignKey: 'mentorId'});

User.hasMany(Conversation, {foreignKey: 'learnerId'});
User.hasMany(Conversation, {foreignKey: 'mentorId'});

User.hasMany(Review, {foreignKey: 'learnerId'});
User.hasMany(Review, {foreignKey: 'mentorId'});


User.hasMany(Appointment, {foreignKey: 'learnerId'});
User.hasMany(Appointment, {foreignKey: 'mentorId'});

User.hasOne(Quality, {foreignKey: 'mentorId'});
// Quality.belongsTo(User, {foreignKey: 'mentorId'});
User.hasOne(Preference, {foreignKey: 'learnerId'});
// Preference.belongsTo(User, {foreignKey: 'learnerId'});

Conversation.hasMany(Message, {foreignKey: 'conversationId'});

//
// sequelize.sync().then(function(){
//    console.log("Created tables in db.js");
// });


// will drop the tables and init them
// sequelize.sync({force:true}).then(function(){
//    console.log("Created tables in db.js");
// });

/// Exports to models
exports.User         = User;
exports.Review       = Review;
exports.Role         = Role;
exports.Conversation = Conversation;
exports.Message      = Message;
exports.Category     = Category;
exports.Appointment  = Appointment;
exports.SkillLevel   = SkillLevel;
exports.Skill        = Skill;
exports.Preference   = Preference;
exports.Quality      = Quality;
