userApp.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

    UserService.getUser();


    $scope.user = UserService.user.response;
    $scope.employees = UserService.employees;

    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 25,
      page: 1
    }

    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 1,
        $scope.myDate.getDate()
    );
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate()
    );

    $scope.submit = function(commute) {
      commute.firstName = UserService.user.response.first_name;
      commute.lastName = UserService.user.response.last_name;
      commute.email = UserService.user.response.email;
      UserService.postCommuteData(commute);
    };

}]);
