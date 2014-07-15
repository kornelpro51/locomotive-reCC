var Sequelize = require("sequelize");
var ts  = require('../../helpers/sequelizeExtraTypes.js');

module.exports = function(sequelize, Sequelize) {
  var Card =  sequelize.define('Card', { // Maybe Change enums to String and Made Mongoose Table

        // Basic Details
        merchantId			: 	ts.unempty_integer,
        cardNumber 			: 	Sequelize.INTEGER,
        cardPin 			: 	Sequelize.INTEGER,
    	  cardType 			: 	ts.unempty_integer,       // See Status Shortcuts

        // Values
        enteredValue        :   ts.unempty_currency,     // Face value of the card
        actualValue  	    : 	ts.unempty_currency,	// Face value of the card
        origOffer           :   ts.unempty_currency,    // Original Offer

        // Rates
    	  sellRate 			:	ts.unempty_integer,			// As Percent (to be deducted off value)
        buyRate 			: 	ts.unempty_integer,			// As Percent (to be deducted off value)

        // Order
    	  sellOrderId			:	ts.unempty_integer,			// Incomming Order # Can never be null
        buyOrderId 			: 	Sequelize.INTEGER,			// Order # Null = Not Ordered

        // Cart
        inCart              :   Sequelize.STRING,          // UserID or SID of user
        cartType            :   Sequelize.STRING,          // UserID or SID
        cartTime            :   Sequelize.DATE,          // When the item was added to cart. Front end controller allows items added > 5 mins ago to be displayed

        // Status
        status              :   ts.unempty_integer,      // See Status Shortcuts (set value in faker)
        verification         :  ts.unempty_integer,      // See Status Shortcuts (set value in faker)

        // Location
        fileBox             :   Sequelize.INTEGER,
        fileSection         :   Sequelize.STRING,

        // Important Dates
        lastScanAt          :   Sequelize.DATE, // Null = Never
        lastVerifyAt        :   Sequelize.DATE, // Null = Never
        pulledAt            :   Sequelize.DATE, // Null = Never
        missingAt           :   Sequelize.DATE, // Null = Never
        shippedAt           :   Sequelize.DATE, // Null = Never

    	  hasOverides			:	{type: Sequelize.BOOLEAN, defaultValue: 0} // Does the card have addtional info in the Mongoose store CardAdditional the may override global data from Merchant
	});

    return Card;
};








