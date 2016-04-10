var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

router.post('/', function(req, res) {
  console.log('in /employees');
  pg.connect(db, function (err, client, done) {
    console.log(req.body);
    var company = req.body;
    var employees = [];
    var query = client.query("SELECT JSON_AGG(email) FROM users WHERE company IN $1",[company]);

    query.on('row', function (row) {
      employees = row.json_agg;
      console.log(employees);
      done();
      res.status(200).send(companies)
    });

    query.on('end', function () {
        client.end();
    });

    if (err) {
        console.log(err);
    }
  });
});

module.exports = router;
