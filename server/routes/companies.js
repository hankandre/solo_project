var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

router.get('/', function(req, res) {
  console.log('in /companies');
  pg.connect(db, function (err, client, done) {
      companies = [];
      var query = client.query("SELECT JSON_AGG(DISTINCT company) from users");

      query.on('row', function (row) {
        companies = row.json_agg;
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
