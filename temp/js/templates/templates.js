angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('/public/app/authentication/authentication.html','<p>Hello {{auth.test}}</p>');
$templateCache.put('/public/app/home/home.html','<p>Hello {{home.test}}</p>');
$templateCache.put('/public/app/registration/registration.html','<p>Hello {{reg.test}}</p>');}]);