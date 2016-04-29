var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var pg = require('pg');

// Gets the companies that have signed up with the app, so their employees can specify who they work for
router.get('/', function(req, res) {
  // Attempts to connect to the database.
  pg.connect(db, function (err, client, done) {
    // If there's an error connecting to the database it gets logged to the console and then sent to the client.
    if (err) {
      done();
      console.log('Error connecting to db ', err);
      res.status(500).send(err)
    } else {

      // Creates an empty array to push the companies to when running the query.
      var results = [];

      // Begins the query of the database
      var query = client.query("SELECT * FROM companies");

      // Pushes the information from the query to the "results" array and ends the query
      query.on('row', function (row) {
        results.push(row);
        done();
      });

      // Sends the information to the client-side (FE) and terminates the postgres connection
      query.on('end', function () {
        done();
        res.status(200).send(results);
        client.end();
      });

      // Handles errors, if any, while running the query.
      query.on('error', function(error) {
        console.log('Error querying database ', error);
        done();
        res.send(error);
      });
    }
  });
});

module.exports = router;
