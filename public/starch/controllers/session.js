nuAdmin.controller('SessionCtrl', function ($scope, $http, $resource, resourceGenerator, Session) { 
    $scope.login = function () {
        console.log ("MO")
        Session.login($scope.user).then(function(res) {
            console.log (res);
        })
    }})


