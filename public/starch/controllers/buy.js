nuAdmin.controller('BuyOrderCtrl', ['$rootScope', '$scope', '$http', '$resource', 'resourceGenerator', 'ngProgressLite', 'growl', 'StatusMap',
    function($rootScope, $scope, $http, $resource, resourceGenerator, ngProgressLite, growl, StatusMap) {

        //$scope.Orders.items[_.indexOf($scope.Orders.items, _.find($scope.Orders.items, {id: $scope.updatedOrderId}))] = angular.fromJson(response.data);
        $scope.Cards = resourceGenerator.init('card', ['Merchant', 'File']);

        $scope.init = function() {
            ngProgressLite.start();
            $scope.Orders = resourceGenerator.init('buy', ['User']);
            $scope.File = resourceGenerator.init('file', []);
            $scope.Orders.getItems();
            ngProgressLite.done();

        }

        $scope.setSelectedFetchCards = function(item) {
            ngProgressLite.start();
            $scope.Orders.selectedItem = item
            $scope.Cards.where['BuyOrderId='] = {
                'column': "buyOrderId",
                'operator': "=",
                'variable': item.id,
                'vartype': "int"
            }
            $scope.Cards.find();
            ngProgressLite.done();
        };

        $scope.setPage = function(page) {
            $scope.Orders.setPage(page);
            $scope.Orders.getItems();
        }

        $scope.saveOrder = function(item) {
            $scope.Orders.resource.update(item, function(response) {
                response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
                $scope.Orders.selectedItem = null;
                $scope.Orders.getItems();

            });
        }

        $scope.toggleSelected = function() {
            var selected = _.filter($scope.Orders.items, function(item) {
                return item.isSelected == true
            })
            $scope.showBatchOperations = (selected.length > 1) ? true : false;
        }


        $scope.batchUpdate = function() {

            var req = {
                'bulk': true,
                'values': $scope.Batch,
                'fields': ['status'],
                'where': {
                    'id': $scope.Orders.getSelected()
                }
            }

            $scope.Orders.resource.update(JSON.stringify(req), function(response) {

                response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
                $scope.Orders.getItems()

            });
        }

        $scope.Cards.generateFileButton = function(card) {
            if (_.isEmpty(card.file) || _.isUndefined(card.file.id)) {
                return "Not Assigned";
            }
            return card.file['id'];
        }

        $scope.search = {
            merchantName: '',
            value: '',
            file: '',
            type: ''
        }

        $scope.showBatchOperations = false;

        $scope.close = function() {
            $scope.Orders.selectedItem = null;
        }


    }
]);