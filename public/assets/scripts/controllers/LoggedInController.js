myApp.controller('LoggedInController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user = DataService.user;

    $scope.submit = function(commute) {
      DataService.postCommuteData(commute);
    }

}]);
