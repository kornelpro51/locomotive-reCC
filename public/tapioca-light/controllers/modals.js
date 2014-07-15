var AddressModalInstanceCtrl = 	function ($scope, $flash, $modal, Address, $modalInstance, type) {

    // console.log(Address);
    $scope.newAddress = {};
    $scope.addressList = null;
    $scope.type = type;

    $scope.init = function () {
        Address.getAll().then(function(addresses) {
        	$scope.addressList     =  addresses;
          $scope.defaultAddress  =  _.findWhere(addresses, { 'def': 1 });
        })
    }

    $scope.addAddress = function () {
     	// console.log($scope.newAddress);
     	Address.create($scope.newAddress).then(function (success) {
     		if (!success) {
                $flash.notify('alert alert-danger', 'Error: Could not create this address.', '');
            } else {
                $modalInstance.close($scope.newAddress);
            }
    	})
    }

    $scope.setDefault = function (addressId) {
        Address.setDefault(addressId).then(function (success) {
            if (!success) alert('Address not set as default')
            $scope.init();
        })
    }

    $scope.select = function (address) {
    	$modalInstance.close(address);
    }

    $scope.closeModal = function () {
      $modalInstance.dismiss('cancel');
    };


};


var CartModalInstanceCtrl = function ($scope, $location, $flash, $modalInstance, currentCart, Cart) {

    $scope.cart = Cart.contents;


    $scope.$watch( function () { return Cart.contents; }, function (data) {
        console.log('Change to Cart Contents')
        $scope.cart = Cart.contents;
    }, true);


    $scope.deleteFromCart = function ( idx ) {
        console.log(idx);
        console.log($scope.cart[idx]);
        var card_to_delete = $scope.cart[idx];

        Cart.deleteFromCart(card_to_delete.id).then(function (success) {
            $scope.cart.splice(idx, 1);
        });
    };

    $scope.checkout = function () {
        $modalInstance.close();
        $location.path('/buy/checkout')
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


};


var LoginModalInstanceCtrl = 	function ($scope, $flash, Session, Account, $modalInstance) {

	var results = {};

	$scope.login = function (user) {

		Session.login(user).then(function(loggedIn) {
			if(!loggedIn) {
				$flash.notify('alert alert-danger', Session.getMessage(), '');
			} else {
		 		results.user = Session.requestCurrentUser();
		 		results.loggedIn = loggedIn;
		 		$modalInstance.close(results);
			}
		});

	}

	$scope.create = function (usersign) {

		Account.create(usersign).then(function(loggedIn) {
			if(!loggedIn) {
				$flash.notify('alert alert-danger', Account.getMessage(), '');
			} else {
		 		results.user = Session.requestCurrentUser();
		 		results.loggedIn = loggedIn;
		 		$modalInstance.close(results);
			}
		});

	}

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};


