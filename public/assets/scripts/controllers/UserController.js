userApp.controller('UserController', ['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog) {

    UserService.getUser();

    $scope.transportationModes = ['Bussed', 'Walked', 'Ran', 'Biked', 'Rollerbladed'];

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    // this.notificationsEnabled = true;
    // this.toggleNotifications = function() {
    //   this.notificationsEnabled = !this.notificationsEnabled;
    // };
    // this.redial = function() {
    //   $mdDialog.show(
    //     $mdDialog.alert()
    //       .targetEvent(originatorEv)
    //       .clickOutsideToClose(true)
    //       .parent('body')
    //       .title('Suddenly, a redial')
    //       .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
    //       .ok('That was easy')
    //   );
    //   originatorEv = null;
    // };
    // this.checkVoicemail = function() {
    //   // This never happens.
    // };
  // });


    $scope.user = UserService.user.response;
    $scope.employees = UserService.employees;

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
