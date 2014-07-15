'use strict';

tapioca.factory('Address', function($http, $q) {

        //Main service calls
        var service = {

            message : null,

            getAll: function() {
               var request = $http.get('/frontend/addresses/');
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    return response.data.data;
                  } else {
                    service.message = response.message;
                    return false;
                  }
               });
               return promise;
            },

            create: function(newAddress) {
               var request = $http.post('/frontend/addresses/', newAddress);
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    return true;
                  } else {
                    service.message = response.message;
                    return false;
                  }
               });
               return promise;
            },

            setDefault: function(addressId) {
               var request = $http.post('/frontend/addresses/default/' + addressId);
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    return true;
                  } else {
                    service.message = response.message;
                    return false;
                  }
               });
               return promise;
            },

            getMessage: function() {
              return service.message;
            }


        } ;

        return service;
    });

