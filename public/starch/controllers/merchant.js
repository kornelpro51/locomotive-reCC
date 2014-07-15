nuAdmin.controller('MerchantCtrl', [ '$scope', '$http', 'resourceGenerator', 'ngProgressLite', 'growl', 'StatusMap',
    function ($scope, $http, resourceGenerator,  ngProgressLite, growl, StatusMap) {

    $scope.Merchants = resourceGenerator.init('merchant');

    $scope.init = function () {
        ngProgressLite.start();
        $scope.Merchants.limit = 50;
        $scope.Merchants.getItems();
        ngProgressLite.done();
    }

    $scope.setPage = function(page) {
        $scope.Merchants.setPage(page);
        $scope.Merchants.getItems();
    }

    $scope.saveMerchant = function(item) {
        $scope.Merchants.resource.update(item, function (response) {
            response.success ?  growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message)) ;
            $scope.Merchants.selectedItem = null;
            $scope.Merchants.getItems();
        });
    }

    $scope.clear = function () {
        $scope.Merchants.clearFilters();
        $scope.Merchants.getItems ();
    }

    $scope.close = function () {
        $scope.Merchants.selectedItem = null;
    }

}]);