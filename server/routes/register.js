var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  var saveUser = {
    email: req.body.email,
    password: req.body.password,
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


  pg.connect(db, function(err, client, done) {
    if (err) {
      done();
      console.log('Error connecting to DB: ', err);
      res.status(500).send(err);
    } else {

      var data = {};
      var query = client.query("INSERT INTO users (email, password, first_name, last_name, " +
                  "company, company_size, benefit_type, address, address2," +
                  "city, state, zip_code, sex, age, birthdate, admin)" +
                  "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, " +
                  "$13, $14, $15, $16) RETURNING first_name",
        [saveUser.email, saveUser.password, saveUser.first_name, saveUser.last_name,
        saveUser.company, saveUser.company_size, saveUser.benefit_type, saveUser.address,
        saveUser.address2, saveUser.city, saveUser.state, saveUser.zip_code, saveUser.sex, saveUser.age,
        saveUser.birthdate, saveUser.admin]);

        query.on('row', function(row) {
          var data = row;
        });

        query.on('end', function() {
          res.send(data);
          done();
        });

        query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.status(500).send(error);
        });
    }
  });
});

module.exports = router;
