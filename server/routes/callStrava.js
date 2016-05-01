var express = require('express');
var router = express.Router();
var strava = require('strava-v3');
var connection = require('../modules/connection');
var pg = require('pg');
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;



// Sends the Strava ID to strava to get their stats
router.get('/:id', function(req, res) {
  const STRAVAID = req.params.id
  console.log('STRAVAID: ', STRAVAID);
  strava.athlete.listActivities({id: STRAVAID}, function(err, payload) {
    if (err) {
      console.log('Error retrieving data from Strava: ', err);
      res.status(500).send(err);
    }
    else {
      pg.connect(connection, function(error, client, done) {
        if (error) {
          done();
          console.log('Error connecting to db for Strava activity insert ', error);
          res.status(500).send(error);
        }
        else {
          var results = [];

          var query = client.query('SELECT id FROM users WHERE strava_id = '+ STRAVAID +';');

          query.on('row', function(row) {
            console.log('Row matching user\'s strava_id: ', row);
            done();
            results.push(row);

            for (var i = 0; i < payload.length; i++) {
              var activity = payload[i];
              query = client.query('INSERT INTO strava (' +
                                    'strava_id, users_id, start_date, activity_id, distance, ' +
                                    'average_speed, elevation_gain, elapsed_time, moving_time) ' +
                                    'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ' +
                                    'SELECT * WHERE NOT EXISTS;',
                                    [STRAVAID, results[0].id, activity.start_date, activity.id, activity.distance,
                                    activity.average_speed, activity.total_elevation_gain, activity.elapsed_time,
                                    activity.moving_time]);

              query.on('row', function(row) {
                done();
                results.push(row);
                console.log('results: ', results);
              });

              query.on('end', function() {
                done()
              });

              query.on('error', function(queryError) {
                done();
                console.log('Error running INSERT into "strava" table: ', queryError);
                res.status(500).send(queryError);
              });
            }
            console.log('All the activities! ', results);
          });

          query.on('end', function() {
            done();
            console.log('results', results);
            res.status(200).send(results);
          });

          query.on('error', function(queryError) {
            done();
            console.log('Error running query ', queryError);
            res.status(500).send(queryError);
          });
        }
      })
    }
  })
});

module.exports = router;
