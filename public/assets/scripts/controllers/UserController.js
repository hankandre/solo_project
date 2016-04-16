userApp.controller('UserController', ['$scope', 'UserService', '$mdDialog', '$filter', function($scope, UserService, $mdDialog, $filter) {

    UserService.getUser();



    $scope.transportationModes = ['Bussed', 'Walked', 'Ran', 'Biked', 'Rollerbladed'];

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

    $scope.user = UserService.user.response;
    $scope.employees = UserService.employees;
    $scope.strava = UserService.user;

    if (UserService.user.stravaInfo == null) {
      
    }
    $scope.totalMiles = function() {
      var total = 0;
      console.log(UserService.employees.response);
      for (var i = 0; i < UserService.employees.response.length; i++) {
        var employee = UserService.employees.response[i];
        var milesNumeric = parseFloat(employee.miles_commuted);

        total += milesNumeric;
      }
      return total;
    }

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
