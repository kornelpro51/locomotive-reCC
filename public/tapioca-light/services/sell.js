'use strict';

tapioca.factory('Sell', function($http, $q) {

        //Main service calls
        var service = {

            getActive: function() {
               var request = $http.get('/frontend/merchant/getActiveSell');
               var promise = request.then(function(response) {
                    return response.data
                    console.log(_.pluck(response.data.data, 'name')     )
               });
               return promise;
            },

            addToCart: function(card) {
               var request = $http.post('/frontend/sell/addToCart/', card);
               var promise = request.then(function(response) {
                    return response.data
               });
               return promise;
            },

            updateCart: function(card) {
               var request = $http.post('/frontend/sell/updateCart/', card);
               var promise = request.then(function(response) {
                    return response.data
               });
               return promise;
            },

            getCart: function() {
               var request = $http.get('/frontend/sell/showCart');
               var promise = request.then(function(response) {
                    return response.data
               });
               return promise;
            },

            deleteFromCart: function(itemId) {
               var request = $http.delete('/frontend/sell/deleteFromCart/' + itemId);
               var promise = request.then(function(response) {
                    return response.data
               });
               return promise;
            }

        } ;


        return service;

    });




