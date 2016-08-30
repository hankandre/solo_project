var router = require('express').Router();
var db = require('../modules/connection');
var encryptLib = require('../modules/encryption');


router.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../../public/views/index.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res) {

  // Builds the object to post info to the database.
	var saveUser = {
		email: req.body.email,
		password: encryptLib.encryptPassword(req.body.password),
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		company: req.body.company,
		benefit_type: req.body.benefit,
		address: req.body.address,
		address2: req.body.address2,
		zip_code: req.body.zip,
		city: req.body.city,
		state: req.body.state,
		sex: req.body.sex,
		age: req.body.age,
		birthdate: req.body.birthdate,
	};

  // Results from the various queries will be pushed to this empty array.
	db.tx(function() {
		var queries = [
			db.none('INSERT INTO login (email, password) VALUES ($1, $2)', [saveUser.email, saveUser.password]),
			db.one('INSERT INTO users (first_name, last_name, company_id, address, address2, zip_code, city, state, age, ' +
        'sex, birthdate, login_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, (SELECT id FROM login WHERE ' +
        'email = $12)) RETURNING first_name, last_name;',
        [saveUser.first_name, saveUser.last_name, saveUser.company, saveUser.address, saveUser.address2, 
          saveUser.zip_code, saveUser.city, saveUser.state, saveUser.age, saveUser.sex, saveUser.birthdate,
          saveUser.email])];
    
		return this.batch(queries);
	})
	.then(function (data) {
		console.log('Inserted data for user ', data);
		res.end();
	})
	.catch(function (error) {
		console.log('Error inserting user ', error);
	});

// // Opens the connection to the database.
//   pg.connect(connection, function(err, client, done) {
//
//     // Handles any errors when connecting to the database.
//     if (err) {
//       next(err);
//       console.log('Error connecting to DB ', err);
//       res.status(500).send(err)
//     }
//     else {
//
//       // Inserts user's email, password, and their admin status into the login table, returning
//       // their unique id and email address.
//       var query = client.query('INSERT INTO login (email, password)' +
//                                   'VALUES ($1, $2) RETURNING id, email',
//                                   [saveUser.email, saveUser.password]);
//
//       // The information returned from the database is pushed into the "results" array,
//       // another query is then run to retrieve the registrant's company name.
//       query.on('row', function(row) {
//         results.push(row);
//
//         // The query is being run, finding the company name based off of the unique id
//         query = client.query('SELECT company_name FROM companies WHERE id = $1;',
//                               [saveUser.company]);
//
//         // The company name is pushed into the "results" array, it now contains the user's
//         // email and their id from the "login" table, as well as the name of the company they work for.
//         query.on('row', function(row) {
//           results.push(row);
//           console.log('Getting companies_name ', results);
//
//         // Handles the end of the company_name query
//         query.on('end', function() {
//           done();
//         });
//
//         // Handles any errors when retrieving the comapn_name from the "companies" table.
//         query.on('error', function(error) {
//           done();
//           console.log('Error retrieving company_name from "companies" table', error);
//           res.status(500).send(error);
//         });
//       });
//
//       // Handles the end of the INSERT into the "login" table
//       query.on('end', function() {
//         done();
//       });
//
//       // Handles any errors when running the INSERT on the "login" table
//       query.on('error', function(error) {
//         console.log('Error running admin registration query:', error);
//         done();
//         res.status(500).send(error);
//       });
//
//       // Now that the login id and the company name are taken care of, the user can be entered into the main
//       // "users" table. This will return the user's first and last name when the insertion is complete.
//       query = client.query('INSERT INTO users (first_name, last_name, company_id,' +
//                             'address, address2, zip_code, city, state, age, sex, birthdate, login_id) ' +
//                             'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING first_name, ' +
//                             'last_name;',
//                             [saveUser.first_name, saveUser.last_name, saveUser.company,
//                             saveUser.address, saveUser.address2, saveUser.zip_code,
//                             saveUser.city, saveUser.state, saveUser.age, saveUser.sex, saveUser.birthdate,
//                             results[0].id]);
//
//       // Pushes the information returned from the query into the results array
//       query.on('row', function(row) {
//         done();
//         results.push(row);
//       });
//
//       // Sends the results array back to the client and terminates the pg client.
//       query.on('end', function() {
//         done();
//         res.status(200).send(results);
//         client.end();
//       });
//
//       // Handles any errors while running the query.
//       query.on('error', function(error) {
//         done();
//         console.log('Error running user registration query:', error);
//         res.status(500).send(error);
//         client.end();
//       });
//     });
//     }
//   });
});

module.exports = router;
