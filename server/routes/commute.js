var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');

// Handles POST request with new user data
router.post('/', function(req, res) {
  console.log(req.body);
  var commute = {
    user_id : req.body.login_id,
    login_id: req.body.login_id,
    company_id: req.body.id,
    company_name: req.body.company_name,
    date: req.body.date,
    modeOfTransportation: req.body.mode,
    miles: req.body.miles
  };

  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.status(500).send(err);
    } else {

      var results = [];
      var company = commute.company_name.split(' ').join('_').toLowerCase();

      query = client.query('INSERT INTO ' + company + ' (login_id, users_id, companies_id, mode_of_transportation, miles_commuted, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
                          [commute.login_id, commute.user_id, commute.company_id, commute.modeOfTransportation, commute.miles, commute.date]);

      query.on('row', function(row) {
        console.log('row from ' + company + ' commute table ', row);
        results.push(row);
        done();
      });

      query.on('end', function() {
        done();
        res.send(results);
      });

      query.on('error', function(error) {
        console.log('Error running INSERT user query ', error);
        done();
        res.send(error);
      });
    }
  });
});

module.exports = router;
