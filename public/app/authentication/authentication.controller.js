(function() {
	'use strict';
	angular
		.module('app.auth')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$log'];

	function AuthenticationController($log) {
		let auth = this;
		auth.test = 'Auth!';
	}
})();