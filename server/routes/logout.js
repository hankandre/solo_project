var express = require('express');
var router = express.Router();

// Handles the loggging out of users
router.get('/', function(req, res) {
  req.logout();
  res.redirect('/#/login');
});
