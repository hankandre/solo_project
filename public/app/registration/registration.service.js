(function() {	'use strict';

	angular
		.module('app.registration')
		.factory('registrationService', registrationService);

	registrationService.$inject = ['$http'];

	function registrationService($http) {
		let service = {

		};

		return service;
		//////////////////
		

		function getCompanies() {
			return $http.get('/companies');
		}
	}
})();