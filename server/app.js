// TECHNOLOGIES
var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util = require('util');
var session = require('express-session');

// MODULES
var passport = require('./modules/passport');
var index = require('./routes/index');

// bodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport and cookie configuration, for authentication
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// Handles Routing
app.use('/', index);

// Sets the port to listen on
app.set('port', (process.env.PORT || 5000));

// configures the port to listen on
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
