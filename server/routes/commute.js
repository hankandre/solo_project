var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');

// Handles POST request with new user data
router.post('/', function(req, res) {
  console.log(req.body);

  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.status(500).send(err);
    } else {

      var query = client.query('CREATE TABLE IF NOT EXISTS ' + req.body.email + '(' +
                                'id SERIAL PRIMARY KEY, ' +
                                'date VARCHAR(160) NOT NULL, ' +
                                'first_name VARCHAR(160) NOT NULL, ' +
                                'last_name VARCHAR(160) NOT NULL, ' +
                                'email VARCHAR(160) NOT NULL, ' +
                                'commute VARCHAR(160) NOT NULL, ' +
                                'miles NUMERIC NOT NULL);');

      query.on('row', function(row) {
        console.log(row);
      });

      query.on('end', function() {
        done();
      });

      query.on('error', function(error) {
        console.log('Error running user query ', error);
        done();
        res.send(error);
      });
    }
  });

  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to commuter database ', err);
      res.status(500).send(err);
    }else {

      var commute = {}

      var query = client.query('INSERT INTO ' + req.body.email +
                                ' (email, date, first_name, ' +
                                'last_name, commute, miles)' +
                                'VALUES ($1, $2, $3, $4, $5, $6) ' +
                                'RETURNING (commute, miles);',
                                [req.body.email, req.body.date, req.body.firstName,
                                req.body.lastName, req.body.mode, req.body.miles]);

      query.on('row', function(row) {
        console.log(row);
        commute = row;
      });

      query.on('end', function() {
        res.send(commute);
        done();
      });

      query.on('error', function(error) {
        console.log('Error running commute query. ', error);
        res.send(error);
        done();
      });
    }
  });
});

module.exports = router;
