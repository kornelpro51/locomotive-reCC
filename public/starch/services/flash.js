'use strict';

nuAdmin.factory('$flash' , function($rootScope) {
  var service = {
    notify : function(level, message, element){
      $rootScope.notification =  {
          level: level,
          message: message,
          element: (element || 'default')
      };
      $rootScope.$emit("event:ngNotification");
      }
    };
  return service;
});
