var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('./user');
var register = require('./register');
var register = require('module');
var path = require('path');

// Handles login form POST from index.html
router.post('/register', register);
router.post('/user', user);

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    var userObject = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      admin: user.admin
    };
    if (err) {
      return next(err);
    }
    if (user === false) {
      res.send(false);
    } else {
      console.log(userObject);
      res.status(200).send(userObject);
    }
  })(req, res, next);
});




module.exports = router;
