'use strict';

(function () {
	'use strict';

	angular.module('app.home').controller('HomeController', HomeController);

	HomeController.$inject = ['$log'];

	function HomeController($log) {
		var home = this;
		home.test = 'Home!';
		$log.log('Home is working');
	}
})();