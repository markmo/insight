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

  $scope.oneAtATime = false;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.updateCustomer = function ($event) {
    // refactor to service
    $http.get('https://smeinsights.herokuapp.com/customer/' + $scope.crn).
      success(function(data) {
        var sections = [];
        for (var i = 0; i < data.length; i++) {
          var section = data[i];
          var fieldlist = [];
          for (var sectionName in section) {
            var fields = section[sectionName];
            for (var j = 0; j < fields.length; j++) {
              var field = fields[j];
              for (var fieldName in field) {
                var val = field[fieldName];
                fieldlist.push([fieldName, val]);
              }
            }
          }
          sections.push([sectionName, fieldlist]);
        }
        $scope.data = sections;
      });
  }
})

.filter('readable', function () {
  return function (input) {
    return readable(input);
  }
});