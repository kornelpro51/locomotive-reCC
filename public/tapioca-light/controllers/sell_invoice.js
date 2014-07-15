tapioca.controller('sellInvoiceCtrl', ['$scope', '$http', '$routeParams', '$flash', '$modal', '$log', '$rootScope',
    function ($scope, $http, $routeParams, $flash, $modal, $log, $rootScope) {
            $http.get('/frontend/sell/getOrder/' + $routeParams.id).then(function (res) {
                $scope.order = res.data.data;
            })
        }
]);

