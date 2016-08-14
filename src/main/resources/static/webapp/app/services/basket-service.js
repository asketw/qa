'use strict';
angular.module('BasketService', ['ngResource'])
  .service('Basket', [function () {
    var Basket = {};
    var items = JSON.parse(localStorage.getItem("basket")) ? JSON.parse(localStorage.getItem("basket")) : [];

    Basket.getItems = function () {
      return angular.copy(items);
    };

    Basket.getTotal = function () {
      var total = 0;
      items.forEach(function (item) {
        total += (item.price * item.amount)
      });
      
      return total
    };

    Basket.addItem = function (item) {
      var foundItem = false;

      items.forEach(function (existingItem) {
        if (existingItem.id == item.id) {
          existingItem.amount++;
          foundItem = true;
          return false; // Break loop
        }
      });

      if (!foundItem) {
        var itemToPush = angular.copy(item);
        itemToPush.amount = 1;
        items.push(itemToPush);
      }

      localStorage.setItem("basket", JSON.stringify(items));
    };

    Basket.removeItem = function (item) {
      var idx = null;
      var existingItem = null;
      var counter = 0;
      items.forEach(function (itm) {
        if (itm.id == item.id) {
          existingItem = itm;
          existingItem.amount -= 1;
          idx = counter;

          return false; // Break loop
        }
        counter++;
      });

      if (existingItem != null && existingItem.amount == 0) {
        items.splice(idx, 1);
      }
      localStorage.setItem("basket", JSON.stringify(items));
    };

    Basket.empty = function () {
      items = [];
      localStorage.setItem("basket", JSON.stringify(items));
    }

    return Basket;
  }]);
