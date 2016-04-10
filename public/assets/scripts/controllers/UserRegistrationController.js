myApp.controller('UserRegistrationController', ['$scope', 'DataService', function($scope, DataService) {
  $scope.companies = [];
    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE


    DataService.getCompanies();
    $scope.companies = DataService.companies;
    console.log($scope.companies);
    console.log(DataService.companies.response);

    // $scope.companies = DataService.companies;


    $scope.submit = function(user) {
      user.admin = false;
      DataService.postUser(user);
    }

}]);
