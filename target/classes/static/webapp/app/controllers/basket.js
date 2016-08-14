'use strict';

angular.module('App.Basket', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/basket', {
    templateUrl: 'templates/basket.html',
    controller: 'BasketCtrl'
  });
}])

.controller('BasketCtrl', ['$scope', '$location', 'Api', 'Basket', function ($scope, $location, Api, Basket) {
  $scope.basketItems = Basket.getItems();
  $scope.getTotal = function() {return Basket.getTotal()};

  $scope.removeFromShoppingCart = function (item) {
    Basket.removeItem(item);
    $scope.basketItems = Basket.getItems();
    $scope.getTotal = function() {return Basket.getTotal()};
  };
  
  $scope.placeOrder = function () {
    if (!$scope.loggedInUser) {
      $scope.showLogin();
      return
    }

    var orderData = {};
    orderData.userId = $scope.loggedInUser.id;
    orderData.items = Basket.getItems();

    var newOrder = new Api.Orders(orderData);
    newOrder.$save(function (result) {
      if (!result) {
        return;
      }

      Basket.empty();
      $location.path("/orders")
    })
  }
}]);