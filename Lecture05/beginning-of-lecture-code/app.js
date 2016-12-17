(function () {
'use strict';

  angular.module('myFirstApp', [])

    .controller('MyFirstController', function ($scope) {
      $scope.name = "Paul";
      $scope.sayHello = function () {
        return "Hello Coursera!";
      }
    });

})();
