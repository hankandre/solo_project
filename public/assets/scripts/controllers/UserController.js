userApp.controller('UserController', ['$scope', 'UserService', '$mdDialog', '$filter', function($scope, UserService, $mdDialog, $filter) {

    UserService.getUser();


    $scope.person = {
      date: '',
      mode: '',
      miles: ''
    }

    var oriUser = angular.copy($scope.person);

    var resetForm = function() {
      $scope.person = angular.copy(oriUser);
      $scope.commuteForm.$setPristine();
      $scope.commuteForm.$setUntouched();
    }



    $scope.transportationModes = ['Bussed', 'Walked', 'Ran', 'Biked', 'Rollerbladed'];

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

    $scope.userData = UserService.user.response;
    $scope.employees = UserService.employees;
    $scope.strava = UserService.user;


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

    $scope.date = new Date();
    $scope.minDate = new Date(
        $scope.date.getFullYear(),
        $scope.date.getMonth() - 1,
        $scope.date.getDate()
    );
    $scope.maxDate = new Date(
        $scope.date.getFullYear(),
        $scope.date.getMonth(),
        $scope.date.getDate()
    );

    $scope.submit = function(commute) {
      console.log(commute);
      UserService.postCommuteData(commute);
      resetForm();
    };

}]);
