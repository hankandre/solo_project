(function() {
	'use strict';

	angular
		.module('app.registration')
		.controller('RegistrationController', RegistrationController);

	RegistrationController.$inject = [];

	function RegistrationController() {
		let reg = this;
		reg.test = 'Registration!';
	}
})();