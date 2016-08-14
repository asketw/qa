'use strict';

angular.module('App.OrderOverview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orders', {
    templateUrl: 'templates/order_overview.html',
    controller: 'OrderOverviewCtrl'
  });
}])

.controller('OrderOverviewCtrl', ['$scope', '$routeParams', '$location', 'Api', function ($scope, $routeParams, $location, Api) {
  $scope.$on( "$viewContentLoaded", function(event, data) {
    if ( $scope.loggedInUser == null ) {
      $location.path("/catalog");
    }
  });
  
  $scope.orders = Api.Orders.query({userId:$scope.loggedInUser.id}, function (result) {
    $scope.orders.forEach(function (order) {
      // Calculate total
      var total = 0;
      order.items.forEach(function (item) {
        total += item.amount * item.price;
      });

      order.total = total;
    });
  });

  $scope.showOrder = function (id) {
    console.log("show order " + id);
    $scope.navigateTo('orders/' + id);
  };
}]);