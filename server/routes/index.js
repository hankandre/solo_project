var express = require('express');
var router = express.Router();
var path = require('path');
var register = require('./register');
var companies = require('./companies');
var employees = require('./employees');
var user = require('./user');
var commute = require('./commute');


router.use('/register', register);
router.use('/companies', companies);
router.use('/employees', employees);
router.use('/user', user);
router.use('/commute', commute);


router.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '../../public/', file));
});

module.exports = router;
