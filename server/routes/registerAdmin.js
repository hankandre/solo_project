var router = require('express').Router();
var bodyParser = require('body-parser');
var db = require('../modules/connection');
var encryptLib = require('../modules/encryption');

// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '../../public/views/index.html'));
// });

// Handles the registration of an admin user; when a company signs up for an account.
router.post('/', function(req, res, next) {
	console.log('Register admin req.body ', req.body);

  // Builds the object to be saved to the database.
	var saveAdmin = {
		email: req.body.email,
		password: encryptLib.encryptPassword(req.body.password),
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		company: req.body.company_name,
		company_size: req.body.companysize,
		benefit_type: req.body.benefit_type,
		address: req.body.address,
		address2: req.body.address2,
		zip_code: req.body.zip,
		city: req.body.city,
		state: req.body.state,
		sex: req.body.sex,
		age: req.body.age,
		birthdate: req.body.birthdate,
		admin: true
	};

	db.tx(function() {

		var queries = [
			this.none('INSERT INTO companies (company_name, benefit_type, company_size) VALUES ($1, $2, $3)',
				[saveAdmin.company, saveAdmin.benefit_type, saveAdmin.company_size]),
			this.none('INSERT INTO login (email, password, admin) VALUES ($1, $2, $3);',
				[saveAdmin.email, saveAdmin.password, saveAdmin.admin]),
			this.many('INSERT INTO users (first_name, last_name, company_id, address, address2, zip_code, city, state, age, ' +
        'login_id) VALUES ($1, $2, (SELECT id FROM companies WHERE company_name = $3), $4, $5, $6, $7, $8, $9, ' +
        '(SELECT id FROM login WHERE email = $10)) RETURNING first_name, last_name;',
        [saveAdmin.first_name, saveAdmin.last_name, saveAdmin.company, saveAdmin.address,
        saveAdmin.address2, saveAdmin.zip_code, saveAdmin.city, saveAdmin.state, saveAdmin.age, saveAdmin.email]),
			this.none('CREATE TABLE $1~ (id SERIAL PRIMARY KEY, users_id INTEGER, companies_id INTEGER, ' +
        'strava_id INTEGER, commute_date DATE, mode_of_transportation VARCHAR(160), miles_commuted NUMERIC,' +
        'CONSTRAINT "users.id" FOREIGN KEY ("users_id") REFERENCES users("id"));',
        [saveAdmin.company])
		];
    
		return this.batch(queries);
	})
	.then(function (data) {
		console.log('insert data', data);
		res.status(200).end();
	})
	.catch(function (error) {
		console.log('Error inserting admin ', error);
		res.status(500).end();
	});
});

module.exports = router;
