nuAdmin.controller('Inventory', function InventoryController($scope, $http, $resource, resourceGenerator, growl, validatorUtils, StatusMap) {

	$scope.Cards = resourceGenerator.init('card', ['Merchant', 'File']);
	$scope.File = resourceGenerator.init('file');

	$scope.fileCard = function(itemId) {
		$scope.disableInput = true;
		if (!$scope.checkBoxes()) {$scope.disableInput = false; return false}
		console.log($scope.Cards.include)
		$scope.Cards.resource.get({
			include : JSON.stringify($scope.Cards.include),
			where: {'id=': {
                'column': "Cards.id",
                'operator': "=",
                'variable': $scope.Cards.input,
                'vartype': "int"
            }}
		}, function(card) { 
			if (card.count != 1 || !card.rows[0].file) {
				console.log(card)
				$scope.disableInput = false;  
				growl.addErrorMessage(JSON.stringify("This Card Has Not Been Filed"));
			    return false}
			var card = {
				'fileBox': $scope.Cards.fileBox,
				'fileSection': $scope.Cards.fileSection.toUpperCase(),
				'lastScanAt': moment().format('YYYY-MM-DD HH:mm:ss'),
				'id' : $scope.Cards.input
			}			
			$scope.Cards.resource.update({id: card.id}, card, function(response) {
				response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
				$scope.disableInput = false;
				$scope.Cards.input = ''
			});
		})
	};

	$scope.fileOrder = function() {
		$scope.disableInput = true;
		if (!$scope.checkBoxes()) {$scope.disableInput = false; return false} 
		var values = {
			'fileBox': $scope.Cards.fileBox,
			'fileSection': $scope.Cards.fileSection.toUpperCase(),
			'lastScanAt': moment().format('YYYY-MM-DD HH:mm:ss')
		}
		var request = {
			'bulk': true,
			'values': values,
			'where': {
				'sellOrderId': $scope.Cards.input
			}
		}
		$scope.Cards.resource.update(JSON.stringify(request), function(response) {
			response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
			$scope.Cards.input = ''
		});
	}

	$scope.markMissing = function() { 
		$scope.File.resource.get({
			id: $scope.Cards.input
		}, function(file) {

			$scope.Cards.resource.get({
				id: file.cardId,
			}, function(card) {

				card.missingAt =  moment().format('YYYY-MM-DD HH:mm:ss')

				console.log(StatusMap.statuses)

				$scope.Cards.resource.update({
					id: card.id
				}, card, function(response) {

					response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
				})
			})
		})
	}

	$scope.unmarkMissing = function() {
		$scope.Cards.resource.get({
			id: $scope.Cards.input
		}, function(card) {
			card.missingAt =  null
			$scope.Cards.resource.update({
				id: card.id
			}, card, function(response) {
				response.success ? growl.addSuccessMessage(JSON.stringify(response.message)) : growl.addErrorMessage(JSON.stringify(response.message));
			})
		})
	}


	$scope.checkBoxes = function() {
		if (_.isEmpty($scope.Cards.fileBox) || !validatorUtils.isNumeric($scope.Cards.fileBox)) {
			alert("Please Enter a Valid File Box");
			return false;
		}
		if (!validatorUtils.isAlpha($scope.Cards.fileSection) || $scope.Cards.fileSection.length != 1) {
			alert("Please Enter a Valid File Section");
			return false;
		}
		return true
	}



});