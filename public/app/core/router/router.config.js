(function() {
	'use strict';
	angular
		.module('app.router')
		.config(routerConfig);

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routerConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/public/app/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			})
			.state('auth', {
				url: '/auth',
				templateUrl: '/public/app/authentication/authentication.html',
				controller: 'AuthenticationController',
				controllerAs: 'auth'
			})
			.state('registration', {
				url: '/register',
				templateUrl: '/public/app/registration/registration.html',
				controller: 'RegistrationController',
				controllerAs: 'reg'
			});
	}
})();