var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

router.get('/:id', function(req, res) {
  console.log('req.params ', req.params);
  pg.connect(db, function (err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.send(err);
    } else {
      var employees = [];
      var company = req.params.id;
      var query = client.query('SELECT * FROM ' + company +' JOIN users ON (' + company + '.users_id = users.id) JOIN login ON (' + company + '.login_id = login.id)');

      query.on('row', function (row) {
        employees.push(row);
        done();
      });

      query.on('end', function () {
        done();
        console.log(employees);
        res.send(employees);
      });

      query.on('error', function(error) {
        console.log('Error running EMPLOYEES query ', error);
        done();
        res.send(error);
      });
    }
  });
});

module.exports = router;
