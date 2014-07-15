var locomotive = require('locomotive'),
	Controller = locomotive.Controller,
	avController = new Controller(),
	_ = require('underscore')

var cardFlo;


avController.index = function() {
 
	var cardFlo = require('../../../workers/lib/cardFlo.js'); 


	
 	// Submit a request
	cardFlo.queueBalanceRequest(12345, 90000000009, 6070755243869277, 53440441)

	// Poll For Messages
	cardFlo.listen(10, 3500);


	this.res.json("Starting Up")
}

 



module.exports = avController;