var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Buy', {

   // Customer Info
    userId		:	ts.unempty_integer,
    firstName  	: 	ts.unempty_name,
    lastName	: 	ts.unempty_name,
    street1		: 	ts.unempty_string,
    street2  	: 	Sequelize.STRING,   				// Allows Null
	city	 	:	ts.unempty_string,
	state	 	:	ts.unempty_string,
	zip			:	ts.unempty_zip,
	zipExtra	:	ts.optional_zipextra,				// Allows Null
	country	 	:	{type: Sequelize.STRING,  defaultValue: 'United States'},
	phone	 	:	ts.unempty_integer,

	// Payment
	payMethod	:	ts.unempty_integer, // See Status Shortcuts
	coupon		:	Sequelize.STRING, // ID <- Make coupon table

	// Payment -> Braintree
	btId		:	Sequelize.STRING,
    btLast4	    :	Sequelize.STRING,
    btCardType	:	Sequelize.STRING,

	// Payment -> ACH
	achAccount		:	Sequelize.STRING,
	achRouting		:	Sequelize.STRING,

	// Payment -> PayPal
	paypalEmail		:	Sequelize.STRING,
	paypalId		:	Sequelize.STRING,

	// Totals (Original)   -- > These Never Change. Look to OrdersHistory (Mongoose Model) to see how we got from org to cur totals
	orgValue	:	ts.unempty_currency,
	orgSubTotal	:	ts.unempty_currency,	//
	orgCharges	:	ts.optional_currency,	// Include Negative/Positive Surcharges, Coupon Codes Gift Card Balance Deduction. Keep track in Mongoose table OrderTotalHistory
	orgTotal	:	ts.unempty_currency,	//

	// Totals (Current)
	curValue	:	ts.unempty_currency,
	curSubTotal	:	ts.unempty_currency,
	curCharges	:	ts.optional_currency,	// Include Negative/Positive Surcharges, Coupon Codes Gift Card Balance Deduction. Keep track in Mongoose table OrderTotalHistory
	curTotal	:	ts.unempty_currency,

	// Shipping
	shipBatch	:	Sequelize.INTEGER,
	shipPile	:	Sequelize.INTEGER,
	shipNote	:	{type: Sequelize.STRING, allowNull: true, defaultValue: null},  // Special Shipping Instructions

	// Important Dates
	completedAt	:	Sequelize.DATE, // completed order may be shipped, canceled etc
	shippedAt	:   Sequelize.DATE,

	// Misc
	status		:	ts.unempty_integer, // See Status Shortcuts
	source		:	{type:Sequelize.ENUM, allowNull: false, validate: {notEmpty: true}, values: ['ABCGiftCards', 'CardCash']},
	affiliate	:	Sequelize.STRING,  // maybe just referenance a Affilate id and add affilate table
	Ip			:	Sequelize.STRING,
	IpXfwd		:	Sequelize.STRING

	},

	{ tableName: 'Buy' }

	);
};

