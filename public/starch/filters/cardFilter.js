nuAdmin.filter('cardFilter', function() {
  return function(input, filter) {

    return _.filter(input, function(item){

    	var returnValue = true;

    	if (returnValue == true && _.isEmpty(filter.merchantName) == false ) {

    		console.log (item.merchant.name + '  ' + filter.merchantName)

    		if ((item.merchant.name.slice(0, filter.merchantName.length) === filter.merchantName) == false) {

    			returnValue = false;
    		}

    	  }


    	return returnValue;

    });

}


});



