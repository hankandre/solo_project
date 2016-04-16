myApp.controller('UserRegistrationController', ['$scope', 'DataService', function($scope, DataService) {
  $scope.companies = [];
    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
   'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
   'WY').split(' ').map(function(state) {
       return {abbrev: state};
     });

    DataService.getCompanies();
    $scope.companies = DataService.companies;
    console.log(DataService.companies.response);

    // $scope.companies = DataService.companies;


    $scope.submit = function(user) {
      user.admin = false;
      DataService.postUser(user);
    }

}]);
