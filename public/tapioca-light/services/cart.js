'use strict';

tapioca.factory('Cart', function($http) {

        //Main service calls
        var service = {

            getCart: function() {
               var request = $http.get('/frontend/showCart/');
               var promise = request.then(function(response) {
                  if (response.data.success == true) {
                    service.contents = response.data.data;
                  } else {
                    service.message = response.data.message;
                  }
                  return service.contents;
               });
               return promise;
            },

            deleteFromCart: function(id) {
                var request = $http.get('/frontend/deleteFromCart/' + id);
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

            addToCart: function(id) {
               var request = $http.get('/frontend/addToCart/' + id);
               var promise = request.then(function(response) {
                  if (response.data.success) {
                    service.contents.push(response.data.data)
                  }
                  console.log
                  return response
               });
               return promise;
            },

            contents: [],
            message: null,

            getMessage: function() {
              return service.message;
            },

            isAvailable: function() {
              return !!service.contents;
            }
        } ;

        return service;

    });




