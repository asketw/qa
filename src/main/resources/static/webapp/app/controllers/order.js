'use strict';

angular.module('App.Order', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/orders/:id', {
      templateUrl: 'templates/order.html',
      controller: 'OrderCtrl'
    });
  }])

  .controller('OrderCtrl', ['$scope', '$routeParams', '$location', 'Api', function ($scope, $routeParams, $location, Api) {
    $scope.order = Api.Orders.get({order_id: $routeParams['id']}, function (result) {
      var total = 0;

      if ($scope.order.items != undefined)
        $scope.order.items.forEach(function (item) {
          total += item.amount * item.price;
        });

      $scope.total = total;
    });

    $scope.total = 0;
  }]);