tapioca.controller('buyCtrl',
    function ($scope, $location, $http, $routeParams, $flash, $modal, $log, $rootScope, Address) {

        $scope.addressList = [];
        $scope.selectedAddress = null;

        $scope.order = {payment : {method : 0}};

        $scope.initCheckout = function() {

          Address.getAll().then(function(addresses) {
            $scope.addressList     =  addresses;
            $scope.defaultAddress  =  _.findWhere(addresses, { 'def': 1 });
            if (addresses.length == 1 && $scope.defaultAddress == null) {
              $scope.selectedAddress  =  addresses[0];
            }
            if ($scope.defaultAddress) {
              $scope.selectedAddress  =  $scope.defaultAddress;
            }
          });

        }

		$scope.submit =  function () {
            $scope.order['address'] = {id : $scope.selectedAddress.id}
            $http.post('/frontend/buy/createOrder', $scope.order).then(function(res) {
                    console.log (res.data.data.id)
                    if (res.data.success) {

                        $location.path('/buy/checkout/invoice/' + res.data.data.id)
                    }
                },
                function (err) {
                    console.log (err)
                }
            )
        }

        $scope.changeAddress = function (type) { // type Change or Add New Address
            var modalInstance = $modal.open({
                templateUrl: 'partials/addressModal.html',
                controller: AddressModalInstanceCtrl,
                resolve: {
                    type: function() {
                        return type;
                    }
                }
            });

            modalInstance.result.then(function (results) {
                $log.info(results);
                $scope.selectedAddress = results;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    });