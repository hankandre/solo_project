var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var db = require('../modules/db');
var encryptLib = require('../modules/encryption');

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../public/views/index.html'));
});

router.post('/', function(req, res, next) {
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
    admin: true
  };

  var results = [];

  pg.connect(db, function(err, client, done) {

    if (err) {
      done();
      console.log('Error connecting to DB ', err);
      res.send(err)
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS "public"."login" (' +
                                '"id" serial, ' +
                                '"email" varchar(160), ' +
                                '"password" varchar(160), ' +
                                '"admin" boolean, ' +
                                'PRIMARY KEY ("id"));');

      query.on('end', function() {
        done();
      });

      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.send(error);
      });

      query = client.query('CREATE TABLE IF NOT EXISTS companies(id SERIAL PRIMARY KEY, company_name varchar(160), benefit_type varchar(160));');

      query.on('end', function() {
        done();
      });

      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.send(error);
      });

      query = client.query('CREATE TABLE IF NOT EXISTS users (' +
                            'id SERIAL PRIMARY KEY,' +
                            'first_name varchar(160),' +
                            'last_name varchar(160),' +
                            'company_id integer,' +
                            'address varchar(160),' +
                            'address2 varchar(160),' +
                            'city varchar(160),' +
                            'state varchar(10),' +
                            'zip_code integer,' +
                            'sex varchar(100),' +
                            'age integer,' +
                            'birthdate date,' +
                            'login_id integer,' +
                            'CONSTRAINT "companies.id" FOREIGN KEY ("company_id") REFERENCES companies("id"),' +
                            'CONSTRAINT "login.id" FOREIGN KEY ("login_id") REFERENCES login("id")' +
                            ');');

        query.on('end', function() {
          done();
        });

        query.on('error', function(error) {
          console.log('Error running query:', error);
          done();
          res.send(error);
        });

        var company = saveUser.company.split(' ').join('_').toLowerCase();
        query = client.query('CREATE TABLE IF NOT EXISTS ' + company  + ' ("id" serial, "login_id" integer, "users_id" integer, "companies_id" integer, "mode_of_transportation" varchar(160), "miles_commuted" numeric, "date" date, PRIMARY KEY ("id"), CONSTRAINT "login_id" FOREIGN KEY ("login_id") REFERENCES "public"."login"("id"), CONSTRAINT "users_id" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id"), CONSTRAINT "companies_id" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id"));');

        query.on('end', function() {
          done();
        });

        query.on('error', function(error) {
          console.log('Error running CREATE TABLE query ', error);
          done();
          res.send(error);
        });

        query = client.query('INSERT INTO login (email, password, admin)' +
                                'VALUES ($1, $2, $3) RETURNING id, email',
                                [saveUser.email, saveUser.password, saveUser.admin]);

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
