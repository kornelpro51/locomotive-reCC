'use strict';

tapioca.factory('Merchants', function($http) {
        //Main service calls
        var service = {

            getAll: function() {
               var request = $http.get('/frontend/merchant');
               var promise = request.then(function(response) {
                  console.log(response);
                  if (response.data.success == true) {
                    service.merchants = response.data;
                  } else {
                    service.message = response.data.message;
                  }
                  return service.merchants;
               });
               return promise;
            },

            getById: function(id) {
                var request = $http.get('/frontend/merchant/' + id);
                var promise = request.then(function(response) {
                    console.log(response);
                    service.message = response.data.message;
                    if(response.data.success == true) {
                      return true;
                    } else {
                      return false;
                    }
                });
                return promise;
            },

            merchants: null,
            message: null,

            getMessage: function() {
              return service.message;
            },

            isAvailable: function() {
              return !!service.merchants;
            }
        } ;

        return service;
    });




