myApp.controller('AdminController', ['$scope', 'DataService', function($scope, DataService) {
  DataService.getEmployees()

  $scope.user = DataService.user.response;
  $scope.employees = DataService.employees

  $scope.selected = [];

  $scope.query = {
    order: 'name',
    limit: 25,
    page: 1
  }

}]);
