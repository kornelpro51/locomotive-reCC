var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('User', {
    firstName   : 	ts.unempty_name,
    lastName  	: 	ts.unempty_name,
    email 		  :   ts.unique_email,
    password 	  :	  ts.unempty_password,
    lastLogin  	: 	{ type: Sequelize.DATE, 	 allowNull: false, validate: {notEmpty: true}, defaultValue: Sequelize.NOW },
    confidence 	:	  { type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true}, defaultValue: 100, validate: {min: 0, max: 100} },
    balance     :   Sequelize.INTEGER,
    role 		:	      {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 1
    }
  }
  , {
    validate: {
      emailAlreadyTaken: function (done) {
          return this.daoFactory.find({
              where: {
                  email: this.email
              }
          }).success(function (user) {
              if (user) {
                throw new Error('Email already taken!');
              }
          }).then(done, done);
      }
    }
  });
};