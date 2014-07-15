var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('File', { // Maybe Change enums to String and Made Mongoose Table
    cardId              :   ts.unique_integer
    });
};










