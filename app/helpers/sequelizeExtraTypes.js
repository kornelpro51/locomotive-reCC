var Sequelize = require("sequelize");

module.exports =   {

	// These are shortcuts to type and validatation definations commonly used in our models

	unique_email: 	{
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			isEmail: {
				msg: "must be a valid email"
			},
		}
		// , unique: true
	},
	unique_string: 	{type: Sequelize.STRING,  allowNull: false, unique: true, validate: {notEmpty: true,} },
	unique_integer: {type: Sequelize.INTEGER,  allowNull: false, unique: true, validate: {notEmpty: true} },

	unempty_string: 		{type: Sequelize.STRING,  allowNull: false, validate: {notEmpty: true} },
	unempty_integer: 		{type: Sequelize.INTEGER,  allowNull: false, validate: {notEmpty: true} },
	unempty_name:				{type: Sequelize.STRING,  allowNull: false, validate: {notEmpty: true} },

	unempty_password: 	{
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: {
				args: [ 8, 20 ],
				msg: "must have 8 to 20 characters"
			}
		}
	},
	unempty_currency:		{type: Sequelize.DECIMAL(10, 2), allowNull: false, validate: {notEmpty: true} },
	unempty_zip: 				{type: Sequelize.INTEGER, allowNull: false, validate: { len: { args: 5, msg: 'must have 5 characters' }} },

	optional_zipextra: 	{type: Sequelize.INTEGER, allowNull: true, validate: { len: 4 } }, // Zip Extra is allowed to be empty though Zip is not
	optional_currency:	{type: Sequelize.DECIMAL(10, 2), defaultValue: 0}

}