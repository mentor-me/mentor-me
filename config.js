var path = require('path');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host     : 'mentorme.marcoberadini.com',
        user     : process.env.db_username,
        password : process.env.db_password,
        database : 'mentorme',
        charset  : 'utf8'
  }}
};
