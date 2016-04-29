var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

// Pulls all the employees for a company, when an admin user logs in
router.get('/:id', function(req, res) {

  // Connects to the database
  pg.connect(db, function (err, client, done) {

    // Handles any errors when connecting to the database
    if (err) {
      done();
      console.log('Error connecting to the Database ', err);
      res.send(err);
    } else {

      // Creates an empty array to push the employees to
      var employees = [];

      // Renames the req.params.id for ease of use
      var company = req.params.id;

      // Runs the query on the specific company's table and returns all the employees found in it.
      var query = client.query('SELECT * FROM ' + company +' JOIN users ON (' + company + '.users_id = users.id) JOIN login ON (' + company + '.login_id = login.id)');

      query.on('row', function (row) {
        console.log('employees ', row);
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
