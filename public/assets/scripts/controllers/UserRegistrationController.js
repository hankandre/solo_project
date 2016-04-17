myApp.controller('UserRegistrationController', ['$scope', '$window', 'DataService', function($scope, $window, DataService) {
  $scope.companies = [];
    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
   'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
   'WY').split(' ').map(function(state) {
       return {abbrev: state};
     });

     var originatorEv;
     $scope.openMenu = function($mdOpenMenu, ev) {
       originatorEv = ev;
       $mdOpenMenu(ev);
     };

    $scope.user = {
      first_name: '',
      last_name: '',
      age: '',
      sex: '',
      birthdate: '',
      email: '',
      company: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      password: ''
    }

    $scope.admin = {
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      companysize: '',
      benefit_type: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      password: ''
    }

    var oriPerson = angular.copy($scope.user);
    var oriAdmin = angular.copy($scope.admin);


    DataService.getCompanies();
    $scope.companies = DataService.companies;
    console.log(DataService.companies.response);

    // $scope.companies = DataService.companies;


    $scope.submit = function(submitUser) {
      submitUser.admin = false;
      DataService.postUser(submitUser);
      resetForm();
    }

    $scope.submitAdmin = function(submitAdmin) {
      submitAdmin.admin = true;
      DataService.postAdmin(submitAdmin);
      resetAdmin();
      // $window.location.href= '/views/index.html';
    }

    var resetAdmin = function () {
      $scope.admin = angular.copy(oriAdmin);
      $scope.adminRegistration.$setPristine();
      $scope.adminRegistration.$setUntouched();
    };

    var resetForm = function () {
      $scope.user = angular.copy(oriPerson);
      $scope.userRegistrationForm.$setPristine();
      $scope.userRegistrationForm.$setUntouched();
    };

}]);
