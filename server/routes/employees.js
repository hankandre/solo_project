var router = require('express').Router();
var db = require('../modules/connection');

// Pulls all the employees for a company, when an admin user logs in
router.get('/', function(req, res) {
  console.log(req.body);
  console.log('employees req.user ', req.user);


  db.any('SELECT * FROM users ON ($1~.users_id = users.id) JOIN login ON ($1~.login_id = login.id);',
        [req.user.company_name])
    .then(function (data) {
      console.log(data);
      res.status(200).send(data);
    })
    .then(function (error) {
      console.log('Error fetching employees from db ', error);
      res.status(500).send(error);
    });

  // Connects to the database
  // pg.connect(connection, function (err, client, done) {
  //
  //   // Handles any errors when connecting to the database
  //   if (err) {
  //     done();
  //     console.log('Error connecting to the Database ', err);
  //     res.status(500).send(err);
  //   } else {
  //
  //     // Creates an empty array to push the employees to
  //     var employees = [];
  //
  //     // Renames the req.params.id for ease of use
  //     var company = req.params.id;
  //
  //     // Runs the query on the specific company's table and returns all the employees found in it.
  //     var query = client.query('SELECT * FROM users ON (' + company +
  //                               '.users_id = users.id) JOIN login ON (' +
  //                               company + '.login_id = login.id);');
  //
  //     // Pushes the employees for the company into an array.
  //     query.on('row', function (row) {
  //       employees.push(row);
  //       done();
  //     });
  //
  //     // Ends the query and sends the employees for the specific company.
  //     query.on('end', function () {
  //       done();
  //       res.status(200).send(employees);
  //       client.end();
  //     });
  //
  //     // Handles any errors while running the query.
  //     query.on('error', function(error) {
  //       console.log('Error running EMPLOYEES query ', error);
  //       done();
  //       res.status(500).send(error);
  //     });
  //   }
  // });
});

module.exports = router;
