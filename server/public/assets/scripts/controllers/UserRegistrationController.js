myApp.controller('UserRegistrationController', ['$scope', 'DataService', function($scope, DataService) {

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE

    $scope.companies = DataService.companies

    $scope.submit = function(user) {
      user.admin = false;
      DataService.postUser(user);
    }

}]);
