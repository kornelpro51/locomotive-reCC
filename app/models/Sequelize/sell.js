var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Sell', {

     // Customer Info
	userId		:	ts.unempty_integer,
  firstName : 	ts.unempty_name,
  lastName	: 	ts.unempty_name,
  street1		: 	ts.unempty_string,
  street2  	: 	Sequelize.STRING,
	city	 		:	ts.unempty_string,
	state	 		:	ts.unempty_string,
	zip				:	ts.unempty_zip,
	zipExtra	:	ts.optional_zipextra,
	country	 	:	{type: Sequelize.STRING,  defaultValue: 'United States'},
	phone	 		:	ts.unempty_integer,
	// Order
	payoutType	:	ts.unempty_integer, // See Status Shortcuts
	orderType	:	ts.unempty_integer, // See Status Shortcuts
	status		:	ts.unempty_integer, // See Status Shortcuts (Set Deafult Value)
	source		:	{type:Sequelize.ENUM, allowNull: false, validate: {notEmpty: true}, values: ['ABCGiftCards', 'CardCash']},

	// Totals (Original)
	orgValue	:	ts.unempty_currency,
	orgOffer	:	ts.unempty_currency,
	orgSubTotal	:	ts.unempty_currency,	//
	orgCharges	:	ts.optional_currency,			// Include Negative/Positive Surcharges, Coupon Codes Gift Card Balance Deduction. Keep track in Mongoose table OrderTotalHistory
	orgTotal	:	ts.unempty_currency,	//

	// Totals (Current)
	curValue	:	ts.unempty_currency,
	curOffer	:	ts.unempty_currency,
	curSubTotal	:	ts.unempty_currency,
	curCharges	:	ts.optional_currency,	// Include Negative/Positive Surcharges, Coupon Codes Gift Card Balance Deduction. Keep track in Mongoose table OrderTotalHistory
	curTotal	:	ts.unempty_currency,

	// Payout Info (Paypal)
	paypalEmail	:	{type: Sequelize.STRING, isEmail: true, allowNull: true,  defaultValue: null},

	// Payout Info (Amazon)
	amazonEmail	:	{type: Sequelize.STRING, isEmail: true, allowNull: true,  defaultValue: null},

	// Payout Info (ACH)
	achAccount		:	{type: Sequelize.STRING, defaultValue: null},
	achRouting		:	{type: Sequelize.STRING, defaultValue: null},

	// other
	massPay		:	{type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0},

	// Important Dates (dateCreated managed by the ORM)
	receivedAt	:	Sequelize.DATE,
	paidAt		:	Sequelize.DATE,
	canceledAt	:	Sequelize.DATE,


	// Misc
	affiliate	:	Sequelize.STRING,  // maybe just referenance a Affilate id and add affilate table
	Ip			:	Sequelize.STRING,
	IpXfwd		:	Sequelize.STRING

	},

	{ tableName: 'Sell' }

	);
};