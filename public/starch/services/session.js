'use strict';

nuAdmin.factory('Session', function($http, $q, $location) {

        //Main service calls
        var service = {

            login: function(user) {
               var request = $http.post('/frontend/login', user);
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    service.currentUser = response.data.data.user;
                    $location.path('/');
                    return true;
                  } else {
                    service.message = response.data.message;
                    return false;
                  }
               });
               return promise;
            },

            logout: function() {
                var request = $http.get('/frontend/logout/');
                var promise = request.then(function(response) {
                    if(response.data.success == true) {
                      service.currentUser = null;
                      return true;
                    } else {
                      return false;
                    }
                });
                return promise;
            },

            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function() {
                if ( service.isAuthenticated() ) {
                    return $q.when(service.currentUser);
                } else {
                    var request = $http.get('/frontend/checkuser/');
                    var promise = request.then(function(response) {
                        if (response.data.success == true) {
                          service.currentUser = response.data.data.user;
                        } else {
                          service.currentUser = null;
                        }
                        return service.currentUser;
                    });
                    return promise;
                }
            },

            //CurrentUser information
            currentUser: null,
            message: null,

            getMessage: function() {
              return service.message;
            },

            isAuthenticated: function() {
                return !!service.currentUser;
            }
        } ;


        return service;

    });




