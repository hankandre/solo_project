var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util = require('util');
var db = require('./modules/db');

var passport = require('./modules/passport');
var session = require('express-session');

// ROUTES
var index = require('./routes/index');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
