'use strict';

(function () {
	'use strict';

	angular.module('app.theme').config(appTheme);

	appTheme.$inject = ['$mdThemingProvider'];

	function appTheme($mdThemingProvider) {
		$mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('cyan');
	}
})();