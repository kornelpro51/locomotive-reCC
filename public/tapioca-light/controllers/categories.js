tapioca.controller('categoriesCtrl',
    function ($scope, $http, $routeParams) {

        console.log($routeParams)
        $http.get('/frontend/merchant').success(function (data) {
            $scope.merchants = data;
        });

});

