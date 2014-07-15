var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
 
var User = require('../models').User;
var Admin = require('../models').Admin;
  
var SampleController = new Controller();

SampleController.main = function() { 

	this.title = 'These Are Not The Droids Your Looking For'
	this.render();
}

module.exports = SampleController;   

 