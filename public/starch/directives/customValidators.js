var ALPHA_REGEXP = /^[a-z]+$/i;

nuAdmin.directive('alpha', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (ALPHA_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('alpha', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          alert ("Not Right");
          return undefined;
        }
      });
    }
  };
});