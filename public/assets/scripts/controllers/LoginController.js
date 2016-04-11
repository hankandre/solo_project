myApp.controller('LoginController', ['$scope', 'DataService', function($scope, DataService) {


    $scope.submit = function(user) {
      DataService.loginUser(user);

    };


}]);
