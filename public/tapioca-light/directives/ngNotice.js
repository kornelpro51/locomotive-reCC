'use strict';

tapioca.directive('ngNotice', function($rootScope) {
    var noticeObject = {
       replace: false,
       transclude: false,
       link: function (scope, element, attr){
         $rootScope.$on("event:ngNotification", function(event){
           if (attr.ngNotice == $rootScope.notification.element){
             element.html("<div class=\""+ $rootScope.notification.level + "\">" +
                          "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
                          "<span><strong>" + $rootScope.notification.message + "</strong></span></div>");
           }
         });
         $rootScope.notification = null;
         attr.ngNotice = attr.ngNotice || 'default';
       }
    };
    return noticeObject;
});
