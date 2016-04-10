var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var createdb = require('./routes/createdb');
var db = require('./modules/db');

// ROUTES
var index = require('./routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
