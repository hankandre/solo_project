var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');
var encryptLib = require('../modules/encryption');


router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../public/views/index.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  console.log('Registration info ', req.body);
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
    admin: false
  };
  console.log(req.body);
  var results = [];

  pg.connect(db, function(err, client, done) {

    if (err) {
      next(err);
      console.log('Error connecting to DB ', err);
      res.send(err)
    } else {

          var query = client.query('INSERT INTO login (email, password, admin)' +
                                  'VALUES ($1, $2, $3) RETURNING id, email',
                                  [saveUser.email, saveUser.password, saveUser.admin]);

          query.on('row', function(row) {
            results.push(row);
            query = client.query('SELECT company_name FROM companies WHERE id = $1;',[saveUser.company]);
            console.log('results from "companies" query ', results);
            query.on('row', function(row) {
              results.push(row);
              console.log('Getting companies_name ', results);
            });

            query.on('end', function() {
              done();
            });

            query.on('error', function(error) {
              console.log('Error running admin registration query:', error);
              done();
              res.send(error);
            });
            query = client.query('INSERT INTO users (first_name, last_name, company_id,' +
                                  'address, address2, zip_code, city, state, age, sex, birthdate, login_id) ' +
                                  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING first_name, ' +
                                  'last_name;',
                                  [saveUser.first_name, saveUser.last_name, saveUser.company,
                                  saveUser.address, saveUser.address2, saveUser.zip_code,
                                  saveUser.city, saveUser.state, saveUser.age, saveUser.sex, saveUser.birthdate,
                                  results[0].id]);

            query.on('row', function(row) {
              results.push(row);

              // query = client.query('INSERT INTO')
              // console.log('users row ', row);
              console.log('user registration results ', results);
            });

            query.on('end', function() {
              res.send(results);
              done();
            });

            query.on('error', function(error) {
              console.log('Error running user registration query:', error);
              done();
              res.send(error);
            });
            console.log('login results: ', results);
          });

          query.on('end', function() {
            done();
          });

          query.on('error', function(error) {
            console.log('Error running login query:', error);
            done();
            res.send(error);
          });


      }
  });
});

module.exports = router;
