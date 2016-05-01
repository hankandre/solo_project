var pg = require('pg');
var connection = require('./connection');

pg.connect(connection, function(err, client, done) {
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
    console.log('Error creating "login" table:', error);
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
    console.log('Error creating "companies" table:', error);
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
      console.log('Error creating "users" table:', error);
      res.status(500).send(error);
    });
});
