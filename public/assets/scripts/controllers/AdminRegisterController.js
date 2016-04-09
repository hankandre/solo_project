myApp.controller('AdminRegisterController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user;

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE

    $scope.getUser = function() {
      DataService.getUser();
      $scope.user = DataService.data;
    }

    $scope.submit = function(user) {
      user.admin = true;
      DataService.postUser(user);
    }


}]);
