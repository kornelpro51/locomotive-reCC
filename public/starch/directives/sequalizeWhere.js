nuAdmin.directive('sequalizeWhere', function() {
	return {
		restrict: 'A',
		scope: {
			column: '@', // String
			operator: '@', // String	
			callback: '=', // Object
			vartype: '@'

		},

		link: function(scope, element, attrs) {

			// Detect outside changes and update our input
			scope.$watch(element.val(), function(val) {});

			// detect inside changes and updated scope
			element.bind('keyup keydown keypress change', function(blurEvent) {

					scope.callback.setWhere(scope.column, scope.operator, element.val(), scope.vartype);

				}

			);
		}
	}
});