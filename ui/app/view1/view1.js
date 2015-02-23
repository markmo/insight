'use strict';

function readable(str) {
  var output = '';
  var len = str.length;
  var char;

  for (var i = 0; i < len; i++) {
    char = str.charAt(i);
    if (i == 0) {
      output += char.toUpperCase();
    }
    else if (char !== char.toLowerCase() && char === char.toUpperCase()) {
      output += ' ' + char;
    }
    else if (char == '-' || char == '_') {
      output += ' ';
    }
    else {
      output += char;
    }
  }

  return output;
}

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {

  $scope.oneAtATime = true;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.updateCustomer = function ($event) {
    // refactor to service
    $http.get('https://blooming-harbor-2517.herokuapp.com/customer/' + $scope.crn).
      success(function(data) {
        $scope.data = data;
      });
  }
})

.filter('readable', function () {
  return function (input) {
    return readable(input);
  }
});