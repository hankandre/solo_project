var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('./user');
var register = require('./register');
var register = require('module');
var path = require('path');

// Handles login form POST from index.html
console.log('in index.js');
router.post('/register', register);
router.post('/user', user);

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (user === false) {
      res.status(401).send(message);
    } else {
      res.status(200).send(user);
    }
  })(req, res, next);
});




module.exports = router;
