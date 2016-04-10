var pg = require('pg');
var db = require('../modules/db.js');
var connectionString = db;

pg.connect(connectionString, function(err, client, done){
  if (err){
      console.log("Error connecting to DB!", err);
  } else {

    var query = client.query('CREATE TABLE IF NOT EXISTS users('+
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
                  'admin BOOLEAN);')

    query.on('end', function(){
        console.log("Successfully checked user table");
        done();
    });

    query.on('error', function(){
        console.log("Error creating new user table");
        done();
    });
  }
});
