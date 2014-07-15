tapioca.controller('accountCtrl',
    function ($scope, $http, $flash, $modal, $log, $rootScope, Session, Cart) {

		console.log ('Account Controller Here');

		$scope.loggedIn = Session.loggedIn;

		$scope.user = Session.user;

		Session.requestCurrentUser().then(function(user) {
			if (!!user) {
		 		$scope.loggedIn = true;
		 		$scope.user = user;
			}
		});

		$scope.logout = function() {

			Session.logout().then(function(success) {
				if (success) {
					$scope.loggedIn = false;
					$scope.user = null;
				}
			});

		};

		$scope.open = function () {

	    var modalInstance = $modal.open({
	      templateUrl: 'partials/accountModal.html',
	      controller: LoginModalInstanceCtrl
	    });

	    modalInstance.result.then(function (results) {
		    	$scope.loggedIn = results.loggedIn;
	        $scope.user = results.user;
	        // populateCart();
	    }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	    });

	  }

});