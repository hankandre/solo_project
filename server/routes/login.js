var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');

// Handles POST request with new user data
router.post('/',
  passport.authenticate('local', {
    successRedirect: '../../views/home.html',
    failureRedirect: '../../views/failure.html'
  })
);

module.exports = router;
