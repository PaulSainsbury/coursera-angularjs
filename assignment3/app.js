(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: "E",
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
  }


  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController ($scope, MenuSearchService) {
    var narrowDown = this;

    narrowDown.searchTerm = '';
    narrowDown.found = [];

    narrowDown.searchForItems = function () {
      MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm).then(function(result){
        narrowDown.found = result;
      });
    }

    narrowDown.removeItem = function(index) {
      narrowDown.found.splice(index,1);
    }

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      })
      .then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        var menu_items = result.data.menu_items;
        if (searchTerm == '') {
          return foundItems;
        }

        for(var i = 0; i < menu_items.length; i++) {
          var item = menu_items[i];
          if (item.name.toLowerCase().indexOf(searchTerm) != -1) {
            foundItems.push(item);
          }
        }
        return foundItems;
      });
    };
  }

})();
