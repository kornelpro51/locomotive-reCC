tapioca.controller('cartCtrl',
    function ($scope, $http, $routeParams, $flash, $modal, $log, $rootScope, Cart) {

        console.log ('Cart Controller Here') 

        Cart.getCart()

        // When AddToCart Button is Pressed
        $scope.$watch( function () { return Cart.contents; }, function (data) {
            console.log('Change to Cart Contents')
            $scope.cart = Cart.contents;
        }, true);

        // Modal Options
        $scope.open = function () {

            var modalInstance = $modal.open({
              templateUrl: 'partials/cartModal.html',
              controller: CartModalInstanceCtrl,
              resolve: {
                currentCart: function () {
                  return $rootScope.cart;
                }
              }
            });

            modalInstance.result.then(function () {
                $log.info('No results to parent');
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

        $scope.close = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
        };


        $scope.opts = {
            backdropFade: true,
            dialogFade:true
        };
 

    }


);