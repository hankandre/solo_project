var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');

// Handles POST request with new user data. Sends the user to the admin home,
// if they are admin, and to the normal home if they're any other user.
router.post('/', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log('login "info" ', info);
		if (err) {
			console.log('passport error: ', err);
			return next(err);
		}
		else if (!user) {
			res.send(info.message);
		}
		else {
			res.send(user);
		}
	})(req, res, next);
});

module.exports = router;
