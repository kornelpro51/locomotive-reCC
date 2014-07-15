var locomotive = require('locomotive')
  , Controller = locomotive.Controller;


var Faker = require("Faker");

var Admin = require('../../models').Admin;
var Merchant = require('../../models').Merchant;
var User = require('../../models').User;
var Card = require('../../models').Card;
var SellOrder = require('../../models').Sell;
var Address = require('../../models').Address;
var BuyOrder = require('../../models').Buy;
var ss = require('../../helpers/sequelizeStatusMap.js');
var FakerController = new Controller();
var _ = require('underscore');


FakerController.generate = function() {

//Cards with Buy Orders
	var Rows = 100;
	var rowsArray = { 'Admin' : [], 'Address': [], 'BuyOrder' : [], 'Card' : [], 'Merchant' : [], 'SellOrder' : [], 'User' : [] };


	for( var i = 0; i < 10; i++ ) {
		for( var j = 1; j < 100; j++ ) {

			rowsArray.Card.push (

					{

						merchantId			: 	j,
						cardNumber 			: 	1234567890,
						cardPin 			: 	'1234',
						cardType 			:   ss.Card.cardType.Physical,
						status				: 	ss.Card.status.Available,
						enteredValue  		: 	150.50,	// Face value of the card
						actualValue  		: 	150.50,	// Face value of the card
						sellRate 			:	88,			// As Percent (to be deducted off value)
						buyRate 			: 	77,			// As Percent (to be deducted off value)
						sellOrderId			:	Math.random() * (100 - 1) + 1,			// Incomming Order # Can never be null
						buyOrderId			:	Math.random() * (100 - 1) + 1,
						verification			: 	ss.Card.verification.Verified

					})

		}


	Card.bulkCreate(rowsArray['Card'])
		.success(function(alist) {
				console.log(alist)
		}).error(function(error) {
				console.log(error)
		})

		rowsArray['Card'] = [];


	}

//Cards without Buy Orders
	for( var i = 0; i < 10; i++ ) {
		for( var j = 1; j < 100; j++ ) {

			rowsArray.Card.push (

					{

						merchantId			: 	j,
						cardNumber 			: 	1234567890,
						cardPin 			: 	'1234',
						cardType 			:   ss.Card.cardType.Physical,
						status				: 	ss.Card.status.Available,
						enteredValue  		: 	150.50,	// Face value of the card
						actualValue  		: 	150.50,	// Face value of the card
						sellRate 			:	88,			// As Percent (to be deducted off value)
						buyRate 			: 	77,			// As Percent (to be deducted off value)
						sellOrderId			:	Math.random() * (100 - 1) + 1,			// Incomming Order # Can never be null
						verification			: 	ss.Card.verification.Verified

					})

		}


	Card.bulkCreate(rowsArray['Card'])
		.success(function(alist) {
				console.log(alist)
		}).error(function(error) {
				console.log(error)
		})

		rowsArray['Card'] = [];


	}

		rowsArray['Merchant'] = [];

  	for( var i = 0; i < Rows; i++ ) {


		var companyName = Faker.Company.companyName() + String(Math.floor(Math.random() * (9000 - 1) + 1));

		rowsArray.Address.push (
		{

					userId		:	Math.random() * (100 - 1) + 1,
					firstName  	: 	Faker.Name.firstName(),
					lastName	: 	Faker.Name.lastName(),
					street1		: 	Faker.Address.streetAddress(),
					city	 	:	Faker.Address.city(),
					state	 	:	Faker.Address.usState(),
					zip			:	Faker.Address.zipCode(),
					phone	 	:	Faker.PhoneNumber.phoneNumber(),
		})

		rowsArray.Merchant.push (
		{

				name 		 	: 	companyName,
				sellRate	 	: 	77,
				buyRate  	 	: 	89,
				image	 	 	:	'http://placehold.it/140x100',
				description	 	: 	'This is an awesome sample description.	',
				passbookType 	:	ss.Merchant.passbookType.None,
				type			:	ss.Merchant.type.Both,
				isActive		:   ss.Merchant.isActive.Both,
				prettyURL		:   companyName
		}

		)

		rowsArray.BuyOrder.push (

				{
					userId		:	Math.random() * (100 - 1) + 1,
					firstName  	: 	Faker.Name.firstName(),
					lastName	: 	Faker.Name.lastName(),
					street1		: 	Faker.Address.streetAddress(),
					city	 	:	Faker.Address.city(),
					state	 	:	Faker.Address.usState(),
					zip			:	Faker.Address.zipCode(),
					phone	 	:	Faker.PhoneNumber.phoneNumber(),

					// Order
					payMethod	:	ss.Buy.payMethod.CreditCard,

					// Totals (Original)
					orgValue	:	100.10,
					orgSubTotal	:	90.21,      							//
					orgTotal	:	90.21, 									//

					// Totals (Current)
					curValue	:	100.10,
					curSubTotal	:	90.21,
					curTotal	:	90.21,

					status		:  ss.Buy.status.Pending,
					source		: 'CardCash'

				}

		)

		rowsArray.SellOrder.push (

				{
					userId		:	Math.random() * (100 - 1) + 1,
					firstName  	: 	Faker.Name.firstName(),
					lastName	: 	Faker.Name.lastName(),
					street1		: 	Faker.Address.streetAddress(),
					city	 	:	Faker.Address.city(),
					state	 	:	Faker.Address.usState(),
					zip			:	Faker.Address.zipCode(),
					phone	 	:	Faker.PhoneNumber.phoneNumber(),

					// Order
					orderType	:	ss.Sell.orderType.Check,
					source		:	'CardCash',
					status		:   ss.Sell.status.Pending,

					// Totals (Original)
					orgValue	:	100.10,
					orgSubTotal	:	90.21,      							//
					orgTotal	:	90.21, 									//

					// Totals (Current)
					curValue	:	100.10,
					curSubTotal	:	90.21,
					curTotal	:	90.21

				}

		)

		rowsArray.User.push (

			{
				firstName  : 	Faker.Name.firstName(),
				lastName  	: 	Faker.Name.lastName(),
				email 		: 	Faker.Internet.email(),
				password 	:	'Abc12345'
			}

		)

	  }

	rowsArray.User.push (

			{
				firstName  : 	'Haggai',
				lastName  	: 	'Weiser',
				email 		: 	'haggai@cardcash.com',
				password 	:	'Abc12345',
				role: 300
			}

	)

  rowsArray.User.push (

    {
      firstName  : 	'Admin',
      lastName  	: 	'CardCash',
      email 		: 	'admin@cardcash.com',
      password 	:	'Abc12345',
      role: 300
    }

  )

  rowsArray.User.push (

    {
      firstName  : 	'Aldo',
      lastName  	: 	'Nievas',
      email 		: 	'aldo@satio.com.ar',
      password 	:	'alduro11',
      role: 101
    }

  )

  BuyOrder.bulkCreate(rowsArray['BuyOrder'])
	.success(function(alist) {
			console.log(alist)
	}).error(function(error) {
			console.log(error)
	})

	// console.log(_.sortBy(_.pluck(rowsArray.Merchant, 'name'), function (name) { return name } ).reverse());

	Merchant.bulkCreate(rowsArray['Merchant'])
	.success(function(alist) {
			console.log(alist)
	}).error(function(error) {
			console.log(error)
	})

	User.bulkCreate(rowsArray['User'])
	.success(function(alist) {
			console.log(alist)
	}).error(function(error) {
			console.log(error)
	})

	Address.bulkCreate(rowsArray['Address'])
	.success(function(alist) {
			console.log(alist)
	}).error(function(error) {
			console.log(error)
	})

	SellOrder.bulkCreate(rowsArray['SellOrder'])
	.success(function(alist) {
			console.log(alist)
	}).error(function(error) {
			console.log(error)
	})

	return this.res.json({ Success: true });

}

module.exports = FakerController;