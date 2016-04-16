var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

router.get('/:id', function(req, res) {
  console.log('getStrava info req.params ', req.params);
  pg.connect(db, function (err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to db ', err);
      res.send(err)
    } else {
      var results = [];
      var query = client.query('SELECT * FROM strava JOIN login ON (strava.login_id = login.id) WHERE login.id = $1', [req.params.id]);

      query.on('row', function (row) {
        console.log('Info from "strava" table', row);
        results.push(row);
        done();
      });

      query.on('end', function () {
        done();
        res.send(results);
      });

      query.on('error', function(error) {
        console.log('Error querying database ', error);
        done();
        res.send(error);
      });
    }
  });
});

module.exports = router;
