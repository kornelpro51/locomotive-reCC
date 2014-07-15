nuAdmin.directive('checkboxAll',function() {
    return {
        restrict: 'E',
        replace: true,
        scope:{
          list: '=', // Object
        },
        template:   
            '<div>'+
                '<input type="checkbox" ng-model="checkAll">'+
            '</div>',
        link: function(scope, element, attrs) {

            scope.checkAll = false;

            scope.$watch('checkAll', function (value){
              for (item in scope.list) { scope.list[item]['isSelected'] = value }
            });


        }
    }
})