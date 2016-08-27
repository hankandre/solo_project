'use strict';

userApp.controller('EditInfoController', ['$scope', 'UserService', function ($scope, UserService) {
  $scope.getStrava = function () {
    UserService.getStrava();
  };
}]);