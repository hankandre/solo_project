(function() {
	angular
		.module('app.router')
		.config(routerConfig);

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routerConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/app/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			});
	}
})();