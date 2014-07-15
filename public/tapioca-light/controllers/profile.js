tapioca.controller('myAccountCtrl', function ($scope, $http, $routeParams) {
 
	$scope.orders = [];
	$http.get('/frontend/buy/getAllOrders').success(function (response) {
		$scope.orders = response.data;
	});

});
