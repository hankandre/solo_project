'use strict';

(function () {
	'use strict';

	angular.module('app.registration').controller('RegistrationController', RegistrationController);

	RegistrationController.$inject = [];

	function RegistrationController() {
		var reg = this;
		reg.test = 'Registration!';
	}
})();