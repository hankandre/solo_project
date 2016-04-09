myApp.controller('LoginController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user;

    $scope.getUser = function() {
      DataService.getUser();
      $scope.user = DataService.data;
    }

    $scope.submit = function(user) {
      DataService.loginUser(user);
    }

}]);
