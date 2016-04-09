var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('./user');
var register = require('./register');
var connection = require('../modules/connection');
var path = require('path');
var pg = require('pg');

// Handles login form POST from index.html
router.use('/register', register);
router.use('/user', user);

router.get('/companies', function(req, res) {
  console.log('in /companies');
  pg.connect(connection, function (err, client, done) {
      companies = [];
      var query = client.query("SELECT JSON_AGG(DISTINCT company) from users");

      query.on('row', function (row) {
        companies = row.json_agg;
        console.log(companies);
        done();
        res.status(200).send(companies)
      });

      // After all data is returned, close connection and return results
      query.on('end', function () {
          client.end();
      });

      // Handle Errors
      if (err) {
          console.log(err);
      }
  });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
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
