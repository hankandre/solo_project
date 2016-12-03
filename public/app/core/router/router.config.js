(function() {
	'use strict';
	angular
		.module('app.router')
		.config(routerConfig);

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routerConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('base', {
				url: '',
				template: `
					<header class="header" ng-include="'/public/content/partials/header.html'"></header>
					<section ui-view></section>
					<footer class="footer" ng-include="'/public/content/partials/footer.html'"></footer>
				`,
				abstract: true,

			})
			.state('base.home', {
				url: '/',
				templateUrl: '/public/app/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			})
			.state('base.auth', {
				url: '/login',
				templateUrl: '/public/app/authentication/authentication.html',
				controller: 'AuthenticationController',
				controllerAs: 'auth'
			})
			.state('base.register', {
				url: '/register',
				templateUrl: '/public/app/registration/registration.html',
				controller: 'RegistrationController',
				controllerAs: 'reg'
			});
	}
})();