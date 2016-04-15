var userApp = angular.module('userApp', ['ngMaterial', 'ngMessages', 'md.data.table', 'ngRoute']);

userApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('cyan');
}]);

userApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
      when("/user", {
          templateUrl: '/views/routes/user.html',
          controller: 'UserController'
      }).
      when("/admin", {
          templateUrl: '/views/routes/admin.html',
          controller: 'UserController'
      })
}]);
