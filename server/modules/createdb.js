var db = require('./connection');

db.tx(function () {
  var queries = [
    this.none('CREATE TABLE IF NOT EXISTS login (id SERIAL PRIMARY KEY, email VARCHAR(160), password VARCHAR(160), ' +
      'admin BOOLEAN DEFAULT false);'),
    this.none('CREATE TABLE IF NOT EXISTS companies (id SERIAL PRIMARY KEY, company_name VARCHAR(160) UNIQUE, benefit_type VARCHAR(160),' +
      'company_size VARCHAR(20));'),
    this.none('CREATE TABLE IF NOT EXISTS strava (id SERIAL PRIMARY KEY, strava_id INTEGER, activity_id INTEGER, ' +
      'start_date DATE,  distance NUMERIC, average_speed NUMERIC,  elevation_gain NUMERIC, elapsed_time INTEGER,  moving_time INTEGER);'),
    this.none('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name VARCHAR(160), last_name VARCHAR(160),' +
      'company_id INTEGER, address VARCHAR(160), address2 VARCHAR(160), city VARCHAR(160), state VARCHAR(10),' +
      'zip_code INTEGER, sex VARCHAR(100), age INTEGER, birthdate DATE, login_id INTEGER, strava_id INTEGER, strava_pic TEXT, ' +
      'CONSTRAINT "companies.id" FOREIGN KEY ("company_id") REFERENCES companies("id"), ' +
      'CONSTRAINT "login.id" FOREIGN KEY ("login_id") REFERENCES login("id"), ' +
      'CONSTRAINT "strava.id" FOREIGN KEY ("strava_id") REFERENCES strava("id"));')
    ];

  return this.batch(queries);
}).
  catch(function (error) {
  console.log('Error creating tables', error);
});



// pg.connect(connection, function(err, client, done) {
//   if (err) {
//     console.log('createDB error: ', err);
//   }
//   else {
//     // Begins the query of the database, creating the "login" table if it doesn't already exist.
//     var query = client.query('CREATE TABLE IF NOT EXISTS login (' +
//                               'id SERIAL PRIMARY KEY, ' +
//                               'email VARCHAR(160), ' +
//                               'password VARCHAR(160), ' +
//                               'admin BOOLEAN DEFAULT false);' +
//
//                               'CREATE TABLE IF NOT EXISTS companies' +
//                               '(id SERIAL PRIMARY KEY, ' +
//                               'company_name varchar(160), ' +
//                               'benefit_type varchar(160));' +
//
//                               'CREATE TABLE IF NOT EXISTS users (' +
//                               'id SERIAL PRIMARY KEY,' +
//                               'first_name VARCHAR(160),' +
//                               'last_name VARCHAR(160),' +
//                               'company_id INTEGER,' +
//                               'address VARCHAR(160),' +
//                               'address2 VARCHAR(160),' +
//                               'city VARCHAR(160),' +
//                               'state VARCHAR(10),' +
//                               'zip_code INTEGER,' +
//                               'sex VARCHAR(100),' +
//                               'age INTEGER,' +
//                               'birthdate DATE,' +
//                               'login_id INTEGER,' +
//                               'strava_id INTEGER,' +
//                               'strava_pic TEXT, ' +
//                               'CONSTRAINT "companies.id" FOREIGN KEY ("company_id") REFERENCES companies("id"),' +
//                               'CONSTRAINT "login.id" FOREIGN KEY ("login_id") REFERENCES login("id"));' +
//
//                               'CREATE TABLE IF NOT EXISTS strava(' +
//                               'id SERIAL PRIMARY KEY,' +
//                               'users_id INTEGER, ' +
//                               'start_date DATE, ' +
//                               'activity_id INTEGER, ' +
//                               'distance NUMERIC, ' +
//                               'average_speed NUMERIC, ' +
//                               'elevation_gain NUMERIC, ' +
//                               'elapsed_time INTEGER, ' +
//                               'moving_time INTEGER, ' +
//                               'CONSTRAINT "users.id" FOREIGN KEY ("users_id") REFERENCES users("id"));');
//
//     // Closes the connection to postgres when the query is done.
//     query.on('end', function() {
//       done();
//     });
//
//     // Handles any errors while running the query.
//     query.on('error', function(error) {
//       done();
//       console.log('Error creating tables:', error);
//       client.end();
//     });
//   }
// });
