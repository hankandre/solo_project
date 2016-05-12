var router = require('express').Router();
var db = require('../modules/connection');

// Handles the posting of user's commute data to the database
router.post('/', function(req, res) {
  // Builds the object that will be posted
  var commute = {
    user_id : req.body.users_id,
    login_id: req.body.login_id,
    company_id: req.body.company_id,
    company_name: req.body.company_name,
    date: req.body.date,
    modeOfTransportation: req.body.mode,
    miles: req.body.miles
  };

  db.one('INSERT INTO $6~ (users_id, companies_id, mode_of_transportation, miles_commuted, commute_date)' +
          'VALUES ($1, $2, $3, $4, $5) RETURNING *;', [req.user.users_id, req.user.company_id,
          commute.modeOfTransportation, commute.miles, commute.date, req.user.company_name])
    .then(function (data) {
      console.log('Insert into commute table ', data);
      res.status(200).send(data);
    })
    .catch(function (error) {
      console.log('Error doing insert into commute table ', error);
      res.status(500).end();
    });

  // // Connects to the database
  // pg.connect(connection, function(err, client, done) {
  //   // If there's an error connecting to the database, log it to the console and send the error to the client
  //   if (err) {
  //     done();
  //     console.log('Error connecting to the Database ', err);
  //     res.status(500).send(err);
  //   } else {
  //
  //     // The "results" array will hold the information returned from the database.
  //     var results = [];
  //
  //     // Formats the company's name so it matches the appropriate company table and assigns it to a variable.
  //     var company = commute.company_name.split(' ').join('_').toLowerCase();
  //
  //     // Inserts the information into the database and returns it back as confirmation
  //     query = client.query('INSERT INTO $7~ (login_id, users_id, companies_id, mode_of_transportation, miles_commuted, date)' +
  //                         'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
  //                         [commute.login_id, commute.user_id, commute.company_id,
  //                           commute.modeOfTransportation, commute.miles, commute.date]);
  //
  //     // Logs out the row from the database to the console and pushes it into the results array from line 30.
  //     query.on('row', function(row) {
  //       console.log('row from ' + company + ' commute table ', row);
  //       results.push(row);
  //       done();
  //     });
  //
  //     // Terminates the query, when it's finished, and sends the information to the client.
  //     query.on('end', function() {
  //       done();
  //       res.send(results);
  //       client.end();
  //     });
  //
  //     // Handles any errors with querying the database and sends them to the client.
  //     query.on('error', function(error) {
  //       console.log('Error running INSERT user query ', error);
  //       done();
  //       res.send(error);
  //     });
  //   }
  // });
});

module.exports = router;
