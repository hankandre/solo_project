myApp.controller('LoggedInController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.user = {};

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $scope.user = DataService.user;
    console.log($scope.user);

}]);
