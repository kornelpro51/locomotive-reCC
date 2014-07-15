nuAdmin.controller('Shipping', function ShippingController($scope, $http, $resource, resourceGenerator, validatorUtils) {

	
	$scope.Cards = resourceGenerator.init('card', ['Merchant', 'File']);
	$scope.File = resourceGenerator.init('file');


	$scope.Cards.markShipped = function (itemId) {  

		var fileBox = $scope.Cards.fileBox
		var fileSection = $scope.Cards.fileSection

		if (_.isEmpty(fileBox) || !validatorUtils.isNumeric(fileBox)) {
			alert ("Please Enter a Valid File Box");
			return false;
		}

		if (!validatorUtils.isAlpha(fileSection) || fileSection.length != 1) {
			alert ("Please Enter a Valid File Section");
			return false;
		}




		$scope.Cards.resource.get({ id: itemId, include: JSON.stringify($scope.Cards.include) }, function (card) { 

			//card['lastScanAt'] = moment().format('YYYY-MM-DD HH:mm:ss') 
			var file = {}
			file['fileBox']  = $scope.Cards.fileBox
			file['fileSection']  = $scope.Cards.fileSection.toUpperCase(); 
			file['cardId']  = card.id
			$scope.File.resource.update({ id: card.file.id }, file) 

		})


 
	};
 
 

  
});
