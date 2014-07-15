nuAdmin.directive('statusMapper', ['StatusMap', function(StatusMap) {
	return {
		restrict: 'E',
		controller: function($scope) {

					StatusMap.init().then (function() {
						$scope.status  = _.invert(StatusMap.statuses[$scope.table][$scope.column])[$scope.code]
					});

			 } ,
		scope: {
			table: '@', // String
			column: '@', // String
			code: '=' // Object
		},
		template: '{{ status }}'




	}
}]);