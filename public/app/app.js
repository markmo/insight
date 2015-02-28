'use strict';

// Declare app level module which depends on views, and components
angular.module('insight', [
  'ngRoute',
  'ui.bootstrap',
  'ngAJAXTabs',
  'customer_detail',
  'controllers'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/crm', {
      controller: 'CrmCtrl',
      templateUrl: 'crm.html'
    })
    .when('/customer', {
      controller: 'CustomerDetailCtrl',
      templateUrl: 'customer_detail/customer_detail.html'
    })
    .when('/', {
      controller: 'TabbedCtrl',
      templateUrl: 'tabbed.html'
    })
    .otherwise({redirectTo: '/'});
}])

.factory('state', function () {
  return {crn: null};
});

var controllers = angular.module('controllers', []).run(function ($rootScope) {
  $rootScope.panes = [{
    name: 'CRM View',
    path: 'crm',
    partial: 'crm.html',
    controller: 'CrmCtrl',
    includedInTabView: false
  }, {
    name: 'SME Insights',
    path: 'customer',
    partial: 'customer_detail/customer_detail.html',
    controller: 'CustomerDetailCtrl',
    includedInTabView: false
  }]
})

.controller('CrmCtrl', function ($scope, $timeout, state) {
  $timeout(function () {
    var frame = document.getElementById('crm-frame');
    frame.onload = function () {
      var body = frame.contentDocument.body;
      var crn = getCrn(body);
      state.crn = crn;
      alert('Found CRN: ' + crn);
    }
  },0);
})

.controller('TabbedCtrl', function ($scope, $routeParams) {
  if ('pane' in $routeParams) {
    $scope.panes[$routeParams.pane].includedInTabView = true;
  }
});


function getCrn(element) {
  var textNodes = [];
  var lastTextNodePos = 0;
  var lastLabelPos = 0;
  var k = 0;
  (function walkDocument(node) {
    if (node) {
      node = node.firstChild;
      while (node != null) {
        if (node.nodeType === 3) { // text element
          var text = node.nodeValue.trim();
          if (/\d{9}/.test(text)) {
            textNodes.push([lastLabelPos, text]);
            lastTextNodePos = k;
          } else {
            text = text.toLowerCase();
            if (text.indexOf('crn') > -1 || text.indexOf('customer number') > -1 || text.indexOf('customer #') > -1) {
              var n = textNodes.length;
              var stepsSinceLastTextNode = k - lastTextNodePos;
              if (n > 0 && stepsSinceLastTextNode < textNodes[n - 1][0]) {
                textNodes[n - 1][0] = stepsSinceLastTextNode;
              }
              lastLabelPos = k;
            }
          }
        } else if (node.nodeType === 1) {
          k++;
          walkDocument(node);
        }
        k++;
        node = node.nextSibling;
      }
    }
  })(element);
  if (textNodes.length) {
    textNodes.sort();
    return textNodes[0][1];
  }
  return 'Unknown';
}
