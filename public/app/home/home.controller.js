(function() {
	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$log'];

	function HomeController($log) {
		var home = this;
		home.world = 'World!';
		$log.log('Home is working');
	}
})();