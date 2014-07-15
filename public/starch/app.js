var nuAdmin = angular.module('nuAdmin', ['ui.bootstrap', 'ngRoute', 'ngResource', '$strap.directives', 'ngProgressLite', 'angular-growl']);

nuAdmin.config( ['ngProgressLiteProvider', '$routeProvider', 'growlProvider', function(ngProgressLiteProvider, $routeProvider, growlProvider) {

  ngProgressLiteProvider.settings.speed = 500;
  ngProgressLiteProvider.settings.ease = 'ease-in';
  growlProvider.globalTimeToLive(1500);

  $routeProvider.
      when('/sell_orders', {
        templateUrl: 'views/sell_orders.html'
      }).
      when('/buy_orders', {
        templateUrl: 'views/buy_orders.html'
      }).
      when('/', {
        templateUrl: 'views/sell_orders.html'
      }).
      when('/cards', {
        templateUrl: 'views/cards.html'
      }).
      when('/customers', {
        templateUrl: 'views/customers.html'
      }).
      when('/inventory', {
        templateUrl: 'views/inventory.html'
      }).
      when('/shipping', {
        templateUrl: 'views/shipping.html'
      }).
      when('/merchants', {
        templateUrl: 'views/merchants.html'
      }).
      when('/login', {
        templateUrl: 'views/login.html'
      }).
      when('/reports', {
          templateUrl: 'views/report.html'
      });
}]);

nuAdmin.run( function ($rootScope, $location, Session, StatusMap) {

    // STATUS MAP AVAILABLE GLOBALLY
    $rootScope.StatusMap = StatusMap
    $rootScope.StatusMap.init()



    // LOGIN REROUTE
    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/login'];

    // check if current location matches route
    var routeClean = function (route) {
      return _.find(routesThatDontRequireAuth,
        function (noAuthRoute) {
          return _.str.startsWith(route, noAuthRoute);
        });
    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // if route requires auth and user is not logged in
      Session.requestCurrentUser().then(function(res) {

        if (!Session.currentUser || !Session.currentUser.role > 100 ) {
          // redirect back to login
          console.log(Session.currentUser)
          $location.path('/login');
      }

    });
  });

})