nuAdmin.factory('validatorUtils', function() {
    return {
        isAlpha: function(input) {
        	var alphaRegex = /^[a-z]+$/i
            return (alphaRegex.test(input)) ? true : false ;
        },
        isNumeric: function(input) {
            var numericRegex = /^[0-9]+$/
            return (numericRegex.test(input)) ? true : false ;

        }
    };
});
 