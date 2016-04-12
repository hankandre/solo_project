myApp.controller('AdminController', ['$scope', 'DataService', function($scope, DataService) {
  DataService.getEmployees()

  $scope.user = DataService.user.response;

    $scope.submit = function(commute) {
      commute.firstName = DataService.user.response.first_name;
      commute.lastName = DataService.user.response.last_name;
      commute.email = DataService.user.response.email;
      DataService.postCommuteData(commute);
    };

}]);
