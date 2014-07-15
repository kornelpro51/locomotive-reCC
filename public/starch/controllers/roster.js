nuAdmin.controller('Roster', function ($scope, $http, $resource, resourceGenerator, growl, validatorUtils, StatusMap) {


	$scope.Cards = resourceGenerator.init('Card', ['Buy', 'File']);
	$scope.filteredData = []
	$scope.batch = null;

	$scope.getBatch = function () {

		$scope.Cards.resource.get({
		  	include : JSON.stringify($scope.Cards.include), 
			where: {
				'shipBatch=': {
                'column': "Buy.shipBatch",
                'operator': "=",
                'variable': $scope.batch,
                'vartype': "int"
            }}
		}, function(orders) { 
			if (!(orders.count > 0)) { 
				growl.addErrorMessage(JSON.stringify("Batch Not Found"));
			    return false;
			}

			$scope.filteredData = orders.rows

			console.log($scope.filteredData)
 
			growl.addSuccessMessage(JSON.stringify("Success"));

		})


	}






});