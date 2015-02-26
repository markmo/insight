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

angular.module('insight.customer_detail', ['ngRoute', 'uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customer', {
    templateUrl: 'customer_detail/customer_detail.html',
    controller: 'CustomerDetailCtrl'
  });
}])

.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB_8MC32Vj_kA6UvpSNOfz4Zv8A9T42LmY',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.factory('CustomerSvc', function ($http, $log, $q) {
  return {
    getCustomer: function (crn) {
      var dfd = $q.defer();
      $http.get('https://smeinsights.herokuapp.com/customer/' + crn)
        .success(function (data) {
          var customer = {};
          var address = {};
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
                  if (sectionName === 'Main') {
                    customer[fieldName] = val;
                  } else {
                    fieldlist.push([fieldName, val]);
                  }
                  if (sectionName === 'Customer Contact Details') {
                    address[fieldName] = val;
                  }
                }
              }
            }
            if (sectionName !== 'Main') {
              sections.push([sectionName, fieldlist]);
            }
          }
          var addr = address['Street Number'] + ' ' + address['Street'] + ', ' + address['Suburb'] + ' ' + address['State'];
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr)
            .success(function (data) {
              dfd.resolve({
                customer: customer,
                address: addr,
                location: data.results[0].geometry.location,
                sections: sections
              });
            });
        })
        .error(function (msg, code) {
          dfd.reject(msg);
          $log.error(msg, code);
        });
      return dfd.promise;
    }
  };
})

.controller('CustomerDetailCtrl', function ($log, $scope, CustomerSvc, uiGmapGoogleMapApi) {

  $scope.oneAtATime = false;

  $scope.opened = function (event) {
    event.currentTarget.parentNode.parentNode.parentNode.classList.toggle('open');
  };

  $scope.marker = {coords: {latitude: 0, longitue: 0}};

  $scope.updateCustomer = function ($event) {
    CustomerSvc.getCustomer($scope.crn).then(
      function (data) {
        var customer = data.customer;
        $scope.fullname = customer['Title'] + ' ' + customer['First Name'] + ' ' + customer['Last Name'];
        $scope.crn = customer['CRN'];
        $scope.data = data.sections;

        uiGmapGoogleMapApi.then(function (maps) {
          var coords = {latitude: data.location.lat, longitude: data.location.lng};
          $scope.map = {center: coords, zoom: 15};
          $scope.marker = {coords: coords};
        });

      },
      function (err) {
        $log.error('failure loading customer with CRN: ' + $scope.crn, err);
      }
    );
  };
})

.filter('readable', function () {
  return function (input) {
    return readable(input);
  }
});