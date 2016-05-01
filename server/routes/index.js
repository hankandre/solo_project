// MODULES
var express = require('express');
var router = express.Router();
var path = require('path');
var register = require('./register');
var registerAdmin = require('./registerAdmin');
var companies = require('./companies');
var employees = require('./employees');
var login = require('./login');
var commute = require('./commute');
var user = require('./user');
var stravaStrategy = require('./strava');
var callStrava = require('./callStrava');
var createdb = require('../modules/createdb');

// ROUTES
router.use('/register', register);
router.use('/registeradmin', registerAdmin);
router.use('/companies', companies);
router.use('/employees', employees);
router.use('/login', login);
router.use('/commute', commute);
router.use('/user', user);
router.use('/auth/strava', stravaStrategy);
router.use('/callstrava', callStrava);

// CATCH-ALL ROUTE
router.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '../../public/', file));
});

module.exports = router;
