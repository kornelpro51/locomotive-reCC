var passport = require('passport')
	, locomotive = require('locomotive')
	, _ = require('underscore')
	, util = require('util')
  , User = require('../../models').User
	, generateResponse  = require('../../helpers/responseGenerator')
	, Controller = locomotive.Controller;


var AccountController = new Controller();

AccountController.login = function() {
  var this_ = this;
  var password = this.param('password');
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return this_.res.json(generateResponse(false, info.message , null));
    } else {
        this_.req.logIn(user, function(err){
          if (err) {
            return next(err);
          }
          return this_.res.json(generateResponse(true, 'Welcome' , { user: user } ));
        });
    }
  })(this.__req, this.__res, this.__next);
}

AccountController.logout = function () {
	if (!this.req.isAuthenticated()) {this.res.json(generateResponse(false, 'Not Logged In' , null))}
	else {
		this.req.logout();
		this.res.json(generateResponse(true, 'Logged Out' , null))
	}
}

AccountController.getUser = function () {

	if (!this.req.isAuthenticated()) {this.res.json(generateResponse(false, 'Not Logged In' , null))}
	if (this.req.isAuthenticated()) {
		this.res.json(generateResponse(true,  'Logged In' , { user: this.req.user } ))}

}

AccountController.create = function() {
  var this_ = this;
  var params = this.req.body;

  User.create(params)
    .success(function(user) {
      if (!user)
        return this_.res.json(generateResponse(false, 'Error creating user.' , null));

      this_.req.logIn(user, function(err) {
        if (err) {
          return this_.res.json(generateResponse(false, 'Error creating user.' , { err: err } ));
        }
        return this_.res.json(generateResponse(true, 'Welcome' , { user: user } ));
      });

    })
    .error(function(error) {
      if (error) {
        var msg = '';
        _.each(error, function(message, key) {
          msg += key + ': ' + message + '<br/>';
        });
        return this_.res.json(generateResponse(false, msg , { error: error } ));
      }
    });

}

// ToDo Add Create Account and Change Password Actions

module.exports = AccountController;


