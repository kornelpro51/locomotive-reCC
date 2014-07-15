tapioca.controller('invoiceCtrl', ['$scope', '$http', '$routeParams', '$flash', '$modal', '$log', '$rootScope',
    function ($scope, $http, $routeParams, $flash, $modal, $log, $rootScope) {
            $http.get('/frontend/buy/getOrder/' + $routeParams.id).then(function (res) {
                $scope.order = res.data.data
                console.log (res.data)
            })
        }
]);

