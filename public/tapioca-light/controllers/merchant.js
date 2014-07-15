tapioca.controller('MerchantCtrl',
    function ($scope, $http, $routeParams, $rootScope, Cart) {

         $scope.selected = function(tabValue) {
            $scope.cards = _.filter($scope.cards, function(card) { return card.cardType == tabValue } );
            if (tabValue == '') {
                $scope.cards = $scope.oldCards;
            }
         };

         $scope.tabs = [
            { name: 'All Cards', value: '' },
            { name: 'Physical Cards', value: '0' },
            { name: 'Electronic Cards', value: '1' },
            { name: 'Printable Cards', value: '2' }
        ];

        $http.get('/frontend/merchant/' + $routeParams.merchant).success(function (data) {
            $scope.merchant = data
            $scope.cards = data.cards
            $scope.oldCards = $scope.cards;
        });

        $scope.$watch( function () { return Cart.contents; }, function (data) {
            $http.get('/frontend/merchant/' + $routeParams.merchant).success(function (data) {
                $scope.merchant = data
                $scope.cards = data.cards
              });
        }, true);

        $scope.addToCart = function (index) {
        	var card = $scope.cards[index];
            Cart.addToCart(card.id)
        }

    }
);
