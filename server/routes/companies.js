var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

router.get('/', function(req, res) {
  pg.connect(db, function (err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to db ', err);
      res.send(err)
    } else {
      var results = [];
      var query = client.query("SELECT * FROM companies");

      query.on('row', function (row) {
        console.log('companies in "companies" table', row);
        results.push(row);
        console.log('"companies" results array ', results);
        done();
      });

      query.on('end', function () {
        done();
        res.send(results);
        client.end();
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
