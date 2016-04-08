var express = require('express');
var router = express.Router();
var passport = require('passport');
// var Users = require('../models/user');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/register', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '/assets/views/register.html'));
});

// Handles POST request with new user data
router.post('/register', function(req, res, next) {
  var saveUser = {
    email: req.body.email,
    password: encryptLib.encryptPassword(req.body.password),
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    company: req.body.company,
    company_size: req.body.companysize,
    benefit_type: req.body.benefit,
    address: req.body.address,
    address2: req.body.address2,
    zip_code: req.body.zip,
    city: req.body.city,
    state: req.body.state,
    sex: req.body.sex,
    age: req.body.age,
    birthdate: req.body.birthdate,
    admin: req.body.admin
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    client.query('CREATE TABLE IF NOT EXISTS users('+
                  'id SERIAL PRIMARY KEY,' +
                  'email VARCHAR(160) NOT NULL UNIQUE,' +
                  'password VARCHAR(120) NOT NULL,' +
                  'first_name VARCHAR(120),' +
                  'last_name VARCHAR(120) ,' +
                  'company VARCHAR(120) ,' +
                  'company_size VARCHAR(25),' +
                  'benefit_type VARCHAR(120),' +
                  'address VARCHAR(120),' +
                  'address2 VARCHAR(120),' +
                  'city VARCHAR(120),' +
                  'state VARCHAR(120),' +
                  'zip_code NUMERIC,' +
                  'sex VARCHAR(120),' +
                  'age INTEGER,' +
                  'birthdate DATE,' +
                  'admin BOOLEAN);');
    client.query("INSERT INTO users (email, password, first_name, last_name, " +
                "company, company_size, benefit_type, address, address2," +
                "city, state, zip_code, sex, age, birthdate, admin)" +
                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, " +
                "$13, $14, $15, $16) RETURNING first_name",
      [saveUser.email, saveUser.password, saveUser.first_name, saveUser.last_name,
      saveUser.company, saveUser.company_size, saveUser.benefit_type, saveUser.address,
      saveUser.address2, saveUser.city, saveUser.state, saveUser.zip_code, saveUser.sex, saveUser.age,
      saveUser.birthdate, saveUser.admin],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });
});


module.exports = router;
