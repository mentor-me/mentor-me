var bcrypt    = require('bcrypt');
var _         = require('lodash');
var cryptojs  = require('crypto-js');
var jwt       = require('jsonwebtoken');
var Sequelize = require('sequelize');
var secret    = require('./config/config.js');


var config = require('../../config.js');
var env = 'development';
// var knex = require('knex')(config[env]);
