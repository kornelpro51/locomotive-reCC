nuAdmin.controller('CustomerCtrl', [ '$rootScope', '$scope', '$http', '$resource', 'resourceGenerator', 'ngProgressLite', 'growl',
    function ($rootScope, $scope, $http, $resource, resourceGenerator, ngProgressLite, growl) {

    $rootScope.$on('update', function(event, response) {
        if ( !response.success ) {
            growl.addErrorMessage(response.message);
        } else {
            growl.addSuccessMessage(response.message, {ttl: 10000});
        }
        $scope.Customers.items[_.indexOf($scope.Customers.items, _.find($scope.Customers.items, {id: $scope.updatedCustomerId}))] = angular.fromJson(response.data);
    });

    $scope.init = function() {
        ngProgressLite.start();
        $scope.Customers = resourceGenerator.init('user', []);
        $scope.Buys      = resourceGenerator.init('buy', []);
        $scope.Sells     = resourceGenerator.init('sell', []);
        $scope.Customers.selectedItem = null;
        getItems();
        ngProgressLite.done();

        // Overrides this method from resourceGenerator.
        $scope.Customers.setSelectedItem = function (selectedItem) {
            ngProgressLite.start();
            $scope.Customers.resource.get({ id: selectedItem.id }, function(customer) {
                $scope.Customers.selectedItem = customer;
                $scope.Buys.where['UserId='] =  {'column': "userId", 'operator': "=", 'variable': selectedItem.id, 'vartype': "int" }
                $scope.Buys.getItems ();
                $scope.Sells.where['UserId='] =  {'column': "userId", 'operator': "=", 'variable': selectedItem.id, 'vartype': "int" }
                $scope.Sells.getItems ();
            });
            ngProgressLite.done();
        };
    }

    $scope.setPage = function(page) {
        $scope.Customers.setPage(page);
        getItems();
    }

    getItems = function() {
        var promise = $scope.Customers.getItems ();
        promise.then(function(results) {
            $scope.Customers.items = results.rows;
        });
    }

    $scope.saveCustomer = function(selectedItem) {
        $scope.updatedCustomerId = selectedItem.id;
        $scope.Customers.resource.update(selectedItem);
        $scope.Customers.selectedItem = null;
    }

    $scope.clear = function () {
        $scope.Customers.clearFilters();
        $scope.Customers.getItems();
    }

    $scope.close = function() {
        $scope.Customers.selectedItem = null;
    }


}]);