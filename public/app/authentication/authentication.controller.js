(function() {
	'use strict';
	angular
		.module('app.auth')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['authenticationService', '$log'];

	function AuthenticationController(authenticationService, $log) {
		let auth = this;
		auth.login = login;

		function login(loginObject) {
			return authenticationService.login(loginObject)
				.then((response) => {
					$log.log(response.data);
					// $rootScope.user = response.data
				});
		}	
	}
})();