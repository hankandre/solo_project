var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');

// Handles POST request with new user data
router.post('/', function(req, res) {

  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.status(500).send(err);
    } else {

      var results = [];
      console.log(req.body.date);

      query = client.query('INSERT INTO ' + req.body.company.split(' ').join('_').toLowerCase() + ' (login_id, mode_of_transportation, miles, date) VALUES ($1, $2, $3, $4) RETURNING login_id, date, miles;',
                          [req.body.id, req.body.mode, req.body.miles, req.body.date]);

      query.on('row', function(row) {
        console.log('row from ' + req.body.company.split(' ').join('_').toLowerCase() + ' commute table ', row);
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
