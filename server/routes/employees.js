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
      var query = client.query('SELECT login.email, users.first_name, users.last_name, ' + company +'.date, ' + company +'.mode_of_transportation, ' + company + '.miles FROM ' + company +' JOIN users ON (' + company + '.login_id = users.login_id) JOIN login ON (users.login_id = login.id)');

      query.on('row', function (row) {
        console.log(row);
        employees = row;
        console.log(employees);
        done();
        res.send(employees)
      });

      query.on('end', function () {
        done();
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
