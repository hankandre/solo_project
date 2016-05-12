var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('cyan');
}]);