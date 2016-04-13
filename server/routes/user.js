var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');

// Handles POST request with new user data
router.post('/', function(req, res) {
  var queryUser = {
    email: req.body.email,
    password: req.body.password
  };

  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.status(500).send(err);
    } else {
      var user;

      var query = client.query('SELECT  users.id AS user_id, users.first_name, users.last_name, login.email, login.id AS login_id, login.admin, companies.name AS company_name, companies.id AS companies_id FROM users JOIN login ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.email = $1 AND login.password = $2',
                              [queryUser.email, queryUser.password]);

      query.on('row', function(row) {
        user = row;
        console.log(user);
      });

      query.on('end', function() {
        if (user === undefined) {
          res.send(false);
        } else {
          res.send(user);
        }
        done();
      });

      query.on('error', function(error) {
        console.log('Error running user query ', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

module.exports = router;
