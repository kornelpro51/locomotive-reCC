var tapioca = angular.module('tapioca', ['ngRoute', 'ngResource', 'ngSanitize', 'siyfion.ngTypeahead', 'ui.bootstrap', 'ngProgressLite', 'angular-growl']);

tapioca.config(['ngProgressLiteProvider', '$routeProvider', 'growlProvider', function(ngProgressLiteProvider, $routeProvider, growlProvider) {

  ngProgressLiteProvider.settings.speed = 500;
  ngProgressLiteProvider.settings.ease = 'ease-in';
  growlProvider.globalTimeToLive(5000);

  $routeProvider.
  when('/', {
    templateUrl: 'views/home.html'
  }).
  when('/buy', {
    templateUrl: 'views/categories.html',
    controller: function($scope, $routeParams, merchants) {
      $scope.merchants = merchants;
    },
    resolve: {
      merchants: function($q, $route, Merchants) {
        var deferred = $q.defer();
        var successCb = function(result) {
          if (angular.equals(result.data, [])) {
            deferred.reject("No merchants found.");
          } else {
            deferred.resolve(result.data);
          }
        };
        Merchants.getAll().then(successCb);
        return deferred.promise;
      }
    }
  }).
  when('/buy/checkout', {
    templateUrl: 'views/buy_checkout.html'
  }).
  when('/buy/checkout/invoice/:id', {
    templateUrl: 'views/buy_invoice.html'
  }).
  when('/buy/:merchant', {
    templateUrl: 'views/merchant.html'
  }).
  when('/sell', {
    templateUrl: 'views/sell_landing.html',
    reloadOnSearch: false
  }).
  when('/sell/cards', {
    templateUrl: 'views/sell_verification.html',
    reloadOnSearch: false
  }).
  when('/sell/checkout', {
    templateUrl: 'views/sell_checkout.html'
  }).
  when('/sell/checkout/invoice/:id', {
    templateUrl: 'views/sell_invoice.html'
  }).
  when('/account/', {
    templateUrl: 'views/account.html'
  });
}]);

tapioca.run(function($rootScope, $location, Session, $modal, $log) {
  // enumerate routes that don't need authentication
  var routesThatRequireAuth = ['/buy/checkout', '/sell'];

  // check if current location matches route
  var routeClean = function(route) {
    return _.find(routesThatRequireAuth,
      function(noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    // Request Current User and Wait Until Resolved
    Session.requestCurrentUser().then(function(res) {
      // Check If Route require admin
      if (routeClean($location.url()) && !Session.currentUser) {
        console.log('Not Logged In')
        event.preventDefault()
        //Pop Open Account Modal
        var modalInstance = $modal.open({
          templateUrl: 'partials/accountModal.html',
          controller: LoginModalInstanceCtrl
        });
        modalInstance.result.then(function(results) {
          $rootScope.loggedIn = results.loggedIn;
          $rootScope.user = results.user;
          if (results.loggedIn) {
            // $location.path('buy/checkout')
            $location.path($location.url());
          }
        }, function() {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }

    });
  });

});

