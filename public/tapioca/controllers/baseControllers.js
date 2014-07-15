tapioca.controller('categoriesCtrl', function categoriesCtrl($scope, $http, $routeParams) {
	 
	console.log($routeParams)

	$http.get('/frontend/merchant').success(function (data) {

		$scope.merchants = data;


	});
  
});
 

tapioca.controller('merchantCtrl', function MerchantCtrl($scope, $http, $routeParams, $rootScope) {
	  

	$http.get('/frontend/merchant/' + $routeParams.merchant).success(function (data) {

		$scope.merchant = data;
		console.log ($scope.merchant)

	});

	$scope.addToCart = function (card) {

		$rootScope.$broadcast('addToCart', card);


	}
  
});

tapioca.controller('cartCtrl', function MerchantCtrl($scope, $http, $routeParams) {
	  
	console.log ('Cart COntroller Here') 
	$scope.cart = []

    $scope.$on('addToCart', function(card){
        $scope.cart.push(card);
        console.log($scope.cart)
    }); 

  
});
 
 