'use strict';
if (typeof api_url === 'undefined')
  var api_url = 'http://api-gateway:8000/';

angular.module('ApiService', ['ngResource'])
  .service('Api', ['$resource', '$http', '$sce',
    function ($resource, $http, $sce) {
      var Api = {};

      //$http.defaults.headers.common['Authorization'] = api_key;
      function handleError(error) {
        if (error && error.data && error.data.description)
          window.alert(error.data.description);
      }

      var defaultResource = {
        'get': {method: 'GET', interceptor: {responseError: handleError}},
        'save': {method: 'POST', interceptor: {responseError: handleError}},
        'query': {method: 'GET', isArray: true, interceptor: {responseError: handleError}},
        'remove': {method: 'DELETE', interceptor: {responseError: handleError}},
        'delete': {method: 'DELETE', interceptor: {responseError: handleError}}
      };

      var updateResource = {
        'update': {method: 'PUT', interceptor: {responseError: handleError}},
        'get': {method: 'GET', interceptor: {responseError: handleError}},
        'save': {method: 'POST', interceptor: {responseError: handleError}},
        'query': {method: 'GET', isArray: true, interceptor: {responseError: handleError}},
        'remove': {method: 'DELETE', interceptor: {responseError: handleError}},
        'delete': {method: 'DELETE', interceptor: {responseError: handleError}}
      };

      Api.Items = $resource(api_url + 'items/:item_id', {item_id: '@item_id'}, updateResource);
      Api.Orders = $resource(api_url + 'orders/:order_id', {order_id: '@order_id'}, updateResource);

      Api.Users = $resource(api_url + 'users/:user_id', {user_id: '@user_id'}, updateResource);
      Api.UserLogin = $resource(api_url + 'users/login', {
        email: '@email',
        password: '@password'
      }, {'query': {method: 'GET', interceptor: {responseError: handleError}}});

      return Api;
    }]);
