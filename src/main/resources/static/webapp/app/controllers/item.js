'use strict';

angular.module('App.Item', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/catalog/:id', {
    templateUrl: 'templates/item.html',
    controller: 'ItemCtrl'
  });
}])

.controller('ItemCtrl', ['$scope', '$routeParams', '$mdToast', 'Api', 'Basket', function ($scope, $routeParams, $mdToast, Api, Basket) {
  $scope.item = Api.Items.get({item_id:$routeParams['id']});

  $scope.addItemToBasket = function (item) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(item.title + ' blev tilføjet til kurven.')
        .position('bottom right')
        .hideDelay(3000)
    );
    Basket.addItem(item);
  };
}]);