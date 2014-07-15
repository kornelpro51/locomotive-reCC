var Sequelize = require("sequelize");
var ts = require('../../helpers/sequelizeExtraTypes.js');
var S = require('string');

module.exports = function(sequelize, Sequelize) {
	var Merchant = sequelize.define('Merchant', {
		name: ts.unempty_string,
		isActive: ts.unempty_integer, // See Statuts Shortcuts (set faker value)
		sellRate: ts.unempty_integer,
		buyRate: ts.unempty_integer,
		image: {
			type: Sequelize.STRING,
			isUrl: true
		},
		description: Sequelize.STRING,
		verifyUrl: {
			type: Sequelize.STRING,
			isUrl: true,
			allowNull: true,
			defaultValue: null
		},
		cardFlo: Sequelize.STRING,
		scrappy: Sequelize.STRING, 
		passbookType: ts.unempty_integer, // see status shortcuts (set def in faker)
		type: ts.unempty_integer, // See Statuts Shortcuts (set faker value)
		prettyURL: {
			type: Sequelize.STRING,
			allowNull: false,
			get: function() {
				return S(this.name).slugify().s
			},
			set: function(v) {
				return this.setDataValue('prettyURL', S(this.name).slugify().s)
			}
		}
	});



	// var Card =  sequelize.import(__dirname + "/card");
	// Merchant.hasMany (Card, { foreignKey: 'merchantId' , useJunctionTable: false});


	return Merchant

};