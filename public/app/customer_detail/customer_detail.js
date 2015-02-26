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

angular.module('insight.customer_detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customer', {
    templateUrl: 'customer_detail/customer_detail.html',
    controller: 'CustomerDetailCtrl'
  });
}])

.factory('CustomerSvc', function ($http, $log, $q) {
  return {
    getCustomer: function (crn) {
      var dfd = $q.defer();
      $http.get('https://smeinsights.herokuapp.com/customer/' + crn)
        .success(function(data) {
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
          dfd.resolve(sections);
        })
        .error(function (msg, code) {
          dfd.reject(msg);
          $log.error(msg, code);
        });
      return dfd.promise;
    }
  };
})

.controller('CustomerDetailCtrl', function ($log, $scope, CustomerSvc) {

  $scope.oneAtATime = false;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.updateCustomer = function ($event) {
    CustomerSvc.getCustomer($scope.crn).then(
      function (data) {
        $scope.data = data;
      },
      function (err) {
        $log.error('failure loading customer with CRN: ' + $scope.crn, err);
      }
    );
  }
})

.filter('readable', function () {
  return function (input) {
    return readable(input);
  }
});