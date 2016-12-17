(function () {
'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.lunchList = "";
    $scope.lunchResult = "";

    $scope.evaluateLunchList = function () {
      var numLunchItems = countLunchItems($scope.lunchList);
      if ($scope.lunchList.length == 0) {
        $scope.lunchResult = "Please enter data first"
      } else if (numLunchItems <= 3) {
        $scope.lunchResult = "Enjoy!"
      } else {
        $scope.lunchResult = "Too much!"
      }
    };

    function countLunchItems(lunchList) {
      return lunchList.split(',').length;
    }

  }



})();
