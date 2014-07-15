var tapioca = angular.module('tapioca', ['ui.bootstrap', 'ngResource', '$strap.directives']);

tapioca.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        templateUrl: 'views/home.html'
      }).
      when('/buy', {
        templateUrl: 'views/buy.html'
      }).
      when('/buy/:merchant', {
        templateUrl: 'views/merchant.html'
      }).
      when('/customers', {
        templateUrl: 'views/customers.html'
      }).
      when('/card_operations', {
        templateUrl: 'views/card_operations.html'
      });
});