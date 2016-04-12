myApp.controller('LoggedInController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user = DataService.user.response;

    $scope.transportationModes = ['Bussed', 'Walked', 'Ran', 'Biked', 'Other'];

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
      commute.firstName = DataService.user.response.first_name;
      commute.lastName = DataService.user.response.last_name;
      commute.email = DataService.user.response.email;
      DataService.postCommuteData(commute);
    };

}]);
