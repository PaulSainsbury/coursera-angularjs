(function () {
  'use strict';

  angular.module('shoppingList', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController ($scope, ShoppingListCheckOffService) {
    var toBuy = this;


    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.message = "Everything is bought!"
  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController ($scope, ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    alreadyBought.message = "Nothing bought yet!";
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var itemsToBuy = [
          { name: "Cookies", qty: "5 bags"},
          { name: "Cookies", qty: "4 bags"},
          { name: "Cookies", qty: "3 bags"},
          { name: "Cookies", qty: "2 bags"},
          { name: "Cookies", qty: "1 bags"},
          { name: "Chips", qty: "10 bags"},
          { name: "Chips", qty: "9 bags"},
          { name: "Chips", qty: "8 bags"},
          { name: "Chips", qty: "7 bags"},
          { name: "Chips", qty: "6 bags"},
          { name: "Chips", qty: "5 bags"}
        ],
      itemsBought = [];

    service.buyItem = function (itemIndex){
      var item = itemsToBuy[itemIndex];
      itemsToBuy.splice(itemIndex,1);
      itemsBought.push(item);
    };

    service.getToBuyItems = function () {
      return itemsToBuy;
    };
    service.getAlreadyBoughtItems = function () {
      return itemsBought;
    };
  }

})();
