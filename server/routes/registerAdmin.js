var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');
var encryptLib = require('../modules/encryption');

// router.get('/', function(req, res, next) {
//     res.sendFile(path.resolve(__dirname, '../../public/views/index.html'));
// });

// Handles the registration of an admin user; when a company signs up for an account.
router.post('/', function(req, res, next) {

  // Builds the object to be saved to the database.
  var saveUser = {
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

  // Creates the array to push the results of the queries to that will eventually be sent to the client.
  var results = [];

  // Opens a connection to the database.
  pg.connect(db, function(err, client, done) {

    // Handles any errors while connecting to the database.
    if (err) {
      done();
      console.log('Error connecting to DB ', err);
      res.status(500).send(err)
    }
    else {
      // Begins the query of the database, creating the "login" table if it doesn't already exist.
      var query = client.query('CREATE TABLE IF NOT EXISTS "public"."login" (' +
                                '"id" serial, ' +
                                '"email" varchar(160), ' +
                                '"password" varchar(160), ' +
                                '"admin" boolean, ' +
                                'PRIMARY KEY ("id"));');

      // Closes the connection to postgres when the query is done.
      query.on('end', function() {
        done();
      });

      // Handles any errors while running the query.
      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.status(500).send(error);
        client.end();
      });

      // Creates a "companies" table, if it doesn't exist.
      query = client.query('CREATE TABLE IF NOT EXISTS companies' +
                          '(id SERIAL PRIMARY KEY, ' +
                          'company_name varchar(160), ' +
                          'benefit_type varchar(160));');

      // Ends the connection to postgres when the query has ended.
      query.on('end', function() {
        done();
      });

      // Handles any errors when running the query.
      query.on('error', function(error) {
        done();
        console.log('Error running query:', error);
        res.status(500).send(error);
      });

      // Creates the "users" table, if it doesn't already exist
      query = client.query('CREATE TABLE IF NOT EXISTS users (' +
                            'id SERIAL PRIMARY KEY,' +
                            'first_name VARCHAR(160),' +
                            'last_name VARCHAR(160),' +
                            'company_id INTEGER,' +
                            'address VARCHAR(160),' +
                            'address2 VARCHAR(160),' +
                            'city VARCHAR(160),' +
                            'state VARCHAR(10),' +
                            'zip_code INTEGER,' +
                            'sex VARCHAR(100),' +
                            'age INTEGER,' +
                            'birthdate DATE,' +
                            'login_id INTEGER,' +
                            'strava_id INTEGER,' +
                            'strava_pic TEXT, ' +
                            'CONSTRAINT "companies.id" FOREIGN KEY ("company_id") REFERENCES companies("id"),' +
                            'CONSTRAINT "login.id" FOREIGN KEY ("login_id") REFERENCES login("id")' +
                            ');');

        // Ends the connection to the database when the query is finished.
        query.on('end', function() {
          done();
        });

        // Handles any errors while running the query.
        query.on('error', function(error) {
          done();
          console.log('Error running query:', error);
          res.status(500).send(error);
        });

        // Formats the user's company to play better with postgres, removing spaces and inserting underscores.
        // Then assigns it the variable name "company" for ease of use.
        var company = saveUser.company.split(' ').join('_').toLowerCase();

        // Creates a specific table for the company's commute data to be input into.
        query = client.query('CREATE TABLE IF NOT EXISTS ' + company  +
                              ' ("id" serial, ' +
                              '"login_id" integer, ' +
                              '"users_id" integer, ' +
                              '"companies_id" integer, ' +
                              '"mode_of_transportation" varchar(160), ' +
                              '"miles_commuted" numeric, ' +
                              '"date" date, ' +
                              'PRIMARY KEY ("id"), ' +
                              'CONSTRAINT "login_id" FOREIGN KEY ("login_id") REFERENCES "public"."login"("id"), ' +
                              'CONSTRAINT "users_id" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id"), ' +
                              'CONSTRAINT "companies_id" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id"));');

        // Ends the connection to the database when the query is finished.
        query.on('end', function() {
          done();
        });

        // Handles any errors while running the query.
        query.on('error', function(error) {
          done();
          console.log('Error running CREATE TABLE query ', error);
          res.status(500).send(error);
        });

        // Now that the tables are created, it's time to insert the admin's information.
        query = client.query('INSERT INTO login (email, password, admin)' +
                              'VALUES ($1, $2, $3) RETURNING id, email',
                              [saveUser.email, saveUser.password, saveUser.admin]);

        // Pushes the returned information (id and email) into the "results" array and moves to the
        // next query into the companies table. The each query is daisy-chained so that upon completion
        // of one, the other begins, this is so that ids from the "companies" and "login" table can
        // be used as foreign keys in the "users" table.
        query.on('row', function(row) {
          results.push(row);
          console.log('results prior to insert into "companies" table ', results);
          query = client.query('INSERT INTO companies (company_name, benefit_type)' +
                                'VALUES ($1, $2) RETURNING (id)',
                                [saveUser.company, saveUser.benefit_type]);

          query.on('row', function(row) {
            results.push(row)
            console.log('companies results ', results);
            console.log('results prior to insert into "users" table ', results);
            var query = client.query('INSERT INTO users (first_name, last_name, company_id,' +
                                  'address, address2, zip_code, city, state, age, birthdate, login_id) ' +
                                  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING (first_name, ' +
                                  'last_name);',
                                  [saveUser.first_name, saveUser.last_name, results[1].id,
                                  saveUser.address, saveUser.address2, saveUser.zip_code,
                                  saveUser.city, saveUser.state, saveUser.age, saveUser.birthdate,
                                  results[0].id]);

            query.on('row', function(row) {
              results.push(row);
              console.log('admin user registration: ', results);
            });

            query.on('end', function() {
              done();
            });

            query.on('error', function(error) {
              console.log('Error running admin registration query:', error);
              done();
              res.send(error);
            });
          });

          query.on('end', function() {
            done();
          });

          query.on('error', function(error) {
            console.log('Error running company query:', error);
            done();
            res.send(error);
          });
          console.log('login results: ', results);
        });

        query.on('end', function() {
          done();
          res.send(results);
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
