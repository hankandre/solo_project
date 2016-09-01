(function() {
	'use strict';
	angular
		.module('app.router')
		.config(routerConfig);

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routerConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('app', {
				url: '',
				template: `
					<ng-include src="'public/content/partials/header.html'"></ng-include>
					<section ui-view></section>
					<ng-include src="'public/content/partials/footer.html'"></ng-include>
				`,
				abstract: true,

			})
			.state('app.home', {
				url: '/home',
				templateUrl: '/public/app/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			})
			.state('app.auth', {
				url: '/auth',
				templateUrl: '/public/app/authentication/authentication.html',
				controller: 'AuthenticationController',
				controllerAs: 'auth'
			})
			.state('app.register', {
				url: '/register',
				templateUrl: '/public/app/registration/registration.html',
				controller: 'RegistrationController',
				controllerAs: 'reg'
			});
	}
})();