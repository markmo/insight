'use strict';

// Declare app level module which depends on views, and components
angular.module('insight', [
  'ngRoute',
  'ui.bootstrap',
  'insight.customer_detail'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/customer'});
}]);
