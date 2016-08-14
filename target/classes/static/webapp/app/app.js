'use strict';

// Declare app level module which depends on views, and components
angular.module('App', [
    'ngRoute',
    'ngMaterial',
    'App.Catalog',
    'App.Item',
    'App.Basket',
    'App.OrderOverview',
    'App.Order',
    'ApiService',
    'BasketService'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/catalog'});
  }])
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  }])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdDialog, $mdMedia, $mdToast, $log, $window) {
    $scope.menuItems = [
      {name: 'Katalog', screen: 'catalog', icon: 'home'},
      {name: 'Kurv', screen: 'basket', icon: 'shopping_cart'},
      {name: 'Ordrer', screen: 'orders', icon: 'receipt'}
    ];

    $scope.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) ? JSON.parse(localStorage.getItem("loggedInUser")) : null;

    $scope.navigateTo = function (to) {
      if (to == 'orders' && !$scope.loggedInUser) {
        $scope.showLogin();
        return
      }
      document.location = 'index.html#/' + to
    };

    $scope.showLogin = function (ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: LoginDialogController,
          templateUrl: 'templates_dialog/login.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        })
        .then(function (user) {
          $scope.loggedInUser = user;
          localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));

          $mdToast.show(
            $mdToast.simple()
              .textContent('Du er blevet logget ind.')
              .position('top right')
              .hideDelay(3000)
          );

        }, function () {
          //console.log("cancelled")
        });
      $scope.$watch(function () {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    $scope.showEditUser = function (ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: EditProfileDialogController,
          templateUrl: 'templates_dialog/editProfile.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        })
        .then(function (user) {


        }, function () {
          //console.log("cancelled")
        });
      $scope.$watch(function () {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    $scope.logout = function () {
      $scope.loggedInUser = null;
      localStorage.removeItem("loggedInUser");

      $mdToast.show(
        $mdToast.simple()
          .textContent('Du er blevet logget ud.')
          .position('top right')
          .hideDelay(3000)
      );
    };

    /* Left menu */

    $scope.isGt = function () {
      return $window.innerWidth >= 1280
    }
    $scope.toggleLeft = function () {
      //Prevent the left menu from being toggled if it's already shown
      if (!$scope.isGt()) {
        return buildDelayedToggler('left')();
      }
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function () {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  });

function LoginDialogController($scope, $mdDialog, Api) {
  $scope.email = "";
  $scope.password = "";

  $scope.login = function () {
    Api.UserLogin.query({email: $scope.email, password: $scope.password}, function (result, err) {
      if (result.id != undefined) {
        $mdDialog.hide(result);
      }
    });
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}


function EditProfileDialogController($scope, $mdDialog, Api) {
  

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}