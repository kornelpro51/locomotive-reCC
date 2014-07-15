'use strict';

tapioca.factory('Account', function($http, $q) {

        //Main service calls
        var service = {

            create: function(user) {
               var request = $http.post('/frontend/account', user);
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    service.currentUser = response.data.user;
                    return true;
                  } else {
                    service.message = response.data.message;
                    return false;
                  }
               });
               return promise;
            },

            message: null,

            getMessage: function() {
              return service.message;
            }
        } ;

        return service;
    });




