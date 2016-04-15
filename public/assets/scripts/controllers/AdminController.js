userApp.controller('AdminController', ['$scope', 'UserService', function($scope, UserService) {
  $location.path('/admin');


  UserService.getUser();
  UserService.getEmployees();

  $scope.user = UserService.user.response;
  $scope.employees = UserService.employees

  $scope.selected = [];

  $scope.query = {
    order: 'name',
    limit: 25,
    page: 1
  }

}]);
