nuAdmin.controller('CardCtrl', ['$rootScope', '$scope', '$http', '$resource', 'resourceGenerator', 'ngProgressLite', 'growl', 'StatusMap',
    function($rootScope, $scope, $http, $resource, resourceGenerator, ngProgressLite, growl, StatusMap) {

    $scope.Cards = resourceGenerator.init('card', ['Merchant', 'File']);
    $scope.File = resourceGenerator.init('file');
	$scope.Cards.getItems ();

	$scope.showBatchOperations = false

    $scope.setPage = function(page) {
        $scope.Cards.setPage(page);
        $scope.Cards.getItems();
    }

    $scope.toggleSelected = function() {
        var selected = _.filter($scope.Cards.items, function(item) {
            return item.isSelected == true
        })
        $scope.showBatchOperations = (selected.length > 1) ? true : false;
    }

    $scope.batchUpdate = function() {

        var req = {
            'bulk': true,
            'values': $scope.Batch,
            'where': {
                'id': $scope.Cards.getSelected()
            }
        }

        $scope.Cards.resource.update(JSON.stringify(req), function(response) { 

            response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
            $scope.Cards.getItems()

        });
    }
 

    $scope.fileSelected = function() {

        var bulkFile = []
        var selected =  _.filter ($scope.Cards.items, function(item) {return item.isSelected == true})
        _.each(selected, function(item) {

            bulkFile.push({cardId : item .id})
            console.log(bulkFile)
        })
 
        var req = {
            'bulk': true,
            'values': bulkFile
        }

        $scope.File.resource.save(JSON.stringify(req), function(response) { 

            response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
            $scope.Cards.getItems()

        });
    }

    }
]);
 

