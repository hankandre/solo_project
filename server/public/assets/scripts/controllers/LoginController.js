myApp.controller('LoginController', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {
    $scope.user;

    $scope.getUser = function() {
      DataService.getUser();
      $scope.user = DataService.data;
    }

    $scope.submit = function(user) {
      DataService.loginUser(user);
    }


}]);
