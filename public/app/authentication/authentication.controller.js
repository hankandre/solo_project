(function() {
	angular
		.module('app.auth')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$log'];

	function HomeController($log) {
		var home = this;
		home.world = 'World!';
		$log.log('Home is working');
	}
})();