var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Address', {
 /*   userId      :   ts.unempty_integer,*/
    firstName   :   ts.unempty_name,
    lastName    :   ts.unempty_name,
    street1     :   ts.unempty_string,
    street2     :   Sequelize.STRING,
    city        :   ts.unempty_string,
    state       :   ts.unempty_string,
    zip         :   ts.unempty_zip,
    zipExtra    :   ts.optional_zipextra,
    country     :   {type: Sequelize.STRING,  defaultValue: 'United States'},
    phone       :   ts.unempty_integer,
    userId      :   ts.unempty_integer,
    def         :   { type: Sequelize.INTEGER,  defaultValue: 0 }
	});
};








