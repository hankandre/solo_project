// connection.js
var connectionString = '';
var pgp = require('pg-promise')();

if(process.env.DATABASE_URL != undefined) {
	connectionString = process.env.DATABASE_URL + '?sslmode=require';
} else {
	connectionString = 'postgres://localhost:5432/commutr';
}

var db = pgp(connectionString);

module.exports = db;
