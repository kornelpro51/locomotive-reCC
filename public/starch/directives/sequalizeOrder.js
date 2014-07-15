nuAdmin.directive('sequalizeOrder', function() {
	return {
		restrict: 'A',
		scope: {
			column: '@', // String
			operator: '@', // String	
			callback: '=', // Object  
		},

		link: function(scope, element, attrs) {

 

			// Detect outside changes and update our input
			scope.$watch(element.val(), function(val) {});

			// detect inside changes and updated scope
			element.bind('click', function(blurEvent) {



					switch (scope.callback.order[scope.column]) {

						case undefined:
							scope.callback.setOrder(scope.column, 'DESC');
							element.attr('class', 'sorting-desc');
							break;
						case 'DESC':
							scope.callback.setOrder(scope.column, 'ASC');
							element.attr('class', 'sorting-asc');
							break;
						case 'ASC':
							scope.callback.setOrder(scope.column);
							element.attr('class', 'sorting');
							break; 

					}
					 

				}

			);
		}
	}
});