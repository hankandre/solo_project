var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('grey');
}]);

myApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/assets/views/logged_in/routes/userHome.html',
      controller: 'LoggedInController'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);
