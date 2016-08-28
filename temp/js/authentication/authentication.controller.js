'use strict';

(function () {
	'use strict';

	angular.module('app.auth').controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$log'];

	function AuthenticationController($log) {
		var auth = this;
		auth.test = 'Auth!';
	}
})();