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
      console.log('No user found!');
      return res.redirect('../views/failure.html');
    }
    else {
      req.logIn(user, function(err) {
        if (err) {
          console.log('login error: ' + err);
          return next(err);
        }
        else if (user.admin) {
          return res.redirect('../views/home.html');
        }
        else {
          return res.redirect('../views/home.html');
        }
      });
    }
  })(req, res, next);
});

module.exports = router;
