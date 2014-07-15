nuAdmin.controller('AlertsCtrl',
    function ($scope, $http, $resource, resourceGenerator) {
	$scope.alerts = [];
    $scope.$on('alertEvent', function(event, data) {  $scope.alerts.push(data); console.log ($scope.alerts) });
});
