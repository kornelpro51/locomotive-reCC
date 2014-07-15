'use strict';

nuAdmin.factory('StatusMap', ['$http', '$q', function($http, $q) {

  //Main service calls
  var service = {

    statuses: null,

    init: function() {

      if (service.statuses != null) {

        var deferred = $q.defer();
        deferred.resolve()
        return deferred.promise

      }

      var request = $http.get('/frontend/statuses');
      var promise = request.then(function(response) {
        if (response.data.success == true) {
          service.statuses = response.data.data;
          return true;
        } else {
          return false;
        }

      });
      return promise;
    },

    map: function(code, table, column) {

      if (service.statuses == null) {return false}
      return _.invert(service.statuses[table][column])[code]

    },

    getTable: function(table, column) {

      if (service.statuses == null) {return false}
      return service.statuses[table][column]

    },

  };


  return service;

}]);
