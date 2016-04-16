var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('cyan');
}]);

// myApp.controller('UserRegistrationController', ['$scope', '$http', function($scope, $http) {
//   $http.get('/companies').then(function(response) {
//     $scope.companies = response.data;
//     console.log($scope.companies);
//   });
//
//   $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
//  'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
//  'WY').split(' ').map(function(state) {
//      return {abbrev: state};
//    });
// }]);
