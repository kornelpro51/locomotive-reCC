nuAdmin.controller('ReportCtrl', [ '$rootScope', '$scope', '$http', '$resource', 'resourceGenerator', 'ngProgressLite', 'growl',
function ($rootScope, $scope, $http, $resource, resourceGenerator, ngProgressLite, growl) {

    $scope.Users = resourceGenerator.init('User');

    $scope.init = function() {
        $scope.Users.find();
    }


}]);