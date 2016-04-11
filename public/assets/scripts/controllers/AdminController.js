myApp.controller('LoggedInController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user = DataService.user.response;

    $scope.transportationModes = ['Bussed', 'Walked', 'Ran', 'Biked', 'Other'];

    $scope.user.date = new Date();
    $scope.minDate = new Date(
        $scope.user.date.getFullYear(),
        $scope.user.date.getMonth() - 1,
        $scope.user.date.getDate()
    );
    $scope.maxDate = new Date(
        $scope.user.date.getFullYear(),
        $scope.user.date.getMonth(),
        $scope.user.date.getDate()
    );

    $scope.submit = function(commute) {
      commute.firstName = DataService.user.response.first_name;
      commute.lastName = DataService.user.response.last_name;
      commute.email = DataService.user.response.email;
      DataService.postCommuteData(commute);
    };

}]);
