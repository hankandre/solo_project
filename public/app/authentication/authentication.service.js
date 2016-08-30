(function() {
	'use strict';

	angular
		.module('app.auth')
		.factory('authenticationService', authenticationService);
	
	authenticationService.$inject = ['$http'];

	function authenticationService($http) {
		let service = {
			login: login
		};

		return service;
		///////////////////////

		function login(loginObject) {
			return $http.post('/register', loginObject);
		}
	}
})();