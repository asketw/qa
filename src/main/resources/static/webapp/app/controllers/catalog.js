'use strict';

angular.module('App.Catalog', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/catalog', {
      templateUrl: 'templates/catalog.html',
      controller: 'CatalogCtrl'
    });
  }])

  .controller('CatalogCtrl', ['$scope', 'Api', 'Basket', '$mdToast', '$document', function ($scope, Api, Basket, $mdToast, $document) {
    $scope.imagePath = 'http://inproofs.com/data_images/out/10/839274-landscape-sunset.jpg';

    $scope.showItem = function (id) {
      console.log("show item " + id);
      $scope.navigateTo('catalog/' + id);
    };

    $scope.addItemToBasket = function (item) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(item.title + ' blev tilføjet til kurven.')
          .position('bottom right')
          .hideDelay(3000)
      );
      Basket.addItem(item);
    };

    $scope.catalogItems = Api.Items.query()

  }]);