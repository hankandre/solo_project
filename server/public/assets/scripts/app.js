var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('grey');
}]);

myApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/assets/views/routes/home.html',
      controller: 'LoginController'
    }).
    when('/register-admin', {
      templateUrl: '/assets/views/routes/register-admin.html',
      controller: 'AdminRegisterController'
    }).
    when ('/register-user', {
      templateUrl: '/assets/views/routes/register-user.html'
    }).
    when('/failure', {
      templateUrl: '/assets/views/routes/register.html'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);
