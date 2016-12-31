(function () {
  'use strict';

  angular.module('shoppingList', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .factory('ItemListFactory', ItemListFactory);

  ToBuyController.$inject = ['$scope', 'ItemListFactory'];
  function ToBuyController ($scope, ItemListFactory) {
    var toBuy = this;

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
    ];
    var itemList = ItemListFactory.getToBuyItems(itemsToBuy),
      boughtList = ItemListFactory.getAlreadyBoughtItems();


    toBuy.buyItem = function (itemIndex) {
      console.log(itemIndex)
      try {
        var item = toBuy.items[itemIndex];
        console.log(item);
        boughtList.addItem(item.name, item.qty);
        itemList.removeItem(itemIndex);

        toBuy.message = "";
      } catch (error) {
        toBuy.message = error.message;
      }
    }

    toBuy.items = itemList.getItems();
  }

  AlreadyBoughtController.$inject = ['$scope', 'ItemListFactory'];
  function AlreadyBoughtController ($scope, ItemListFactory) {
    var alreadyBought = this;

    var itemList = ItemListFactory.getAlreadyBoughtItems();
    alreadyBought.message = itemList.emptyMessage;

    alreadyBought.buyItem = function (itemIndex) {
      try {
        itemList.addItem(itemIndex);
        alreadyBought.message = "";
      } catch (error) {
        alreadyBought.message = error.message;
      }
    }

    alreadyBought.items = itemList.getItems();
  }

  function ItemListService(initialItems) {
    var service = this;

    // List of shopping items
    var items = initialItems || [];

    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        qty: quantity
      };
      items.push(item);
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
      if (items.length == 0) {
        throw new Error(this.emptyMessage)
      }
    };

    service.getItems = function () {
      return items;
    };
  }

  function ItemListFactory() {
    var toBuyList, alreadyBoughtList;
    var factory = {
      getToBuyItems : function (initialItems) {
        toBuyList = toBuyList || new ItemListService(initialItems);
        toBuyList.emptyMessage = 'Everything is bought!'
        return toBuyList;
      },
      getAlreadyBoughtItems : function () {
        alreadyBoughtList = alreadyBoughtList || new ItemListService(null);
        alreadyBoughtList.emptyMessage = 'Nothing bought yet'
        return alreadyBoughtList;
      }
    };

    return factory;
  }


})();
