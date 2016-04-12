var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('cyan');
}]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
      when("/login", {
          templateUrl: '/views/routes/login.html',
          controller: 'LoginController'
      }).
      when("/user", {
        templateUrl: '/views/routes/user.html',
        controller: 'LoggedInController'
      }).
      when('/admin', {
        templateUrl: '/views/routes/admin.html',
        controller: 'AdminController'
      }).
      otherwise({
          redirectTo: '/login'
      });
}]);
