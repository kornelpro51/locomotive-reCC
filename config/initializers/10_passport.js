var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models').User;
var util = require('util');

module.exports = function() {

  var SALT_WORK_FACTOR = 10;

  // Sessions and Such
  passport.serializeUser(function(user, done) {
    console.log('Im doing it!' + user.id);
    // console.log('Serializing ' + util.inspect(user));
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find({ 
          where: {id: id}
        })
      .success(function(user) {
        // console.log('Deserializing ' + util.inspect(user));
        if (!user) { }
        else {
          done(false, user);
        }
      })
      .error(function(err) {
      })
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.find({ where: {email: username}})
        .success(function(user) {
          // console.log(user);
          if (!user) { return done(null, false, { message: 'Invalid email or password.' }); }
          if (user.password != password) { return done(null, false, { message: 'Invalid email or password.' }); }
          var ret = {'firstName': user.firstName, 'email': user.email, 'role': user.role, 'id':user.id }
          return done(null, ret);
        })
        .error(function(err) {
            return done(err)
        })
    }
  ));

}

