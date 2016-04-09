var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.post('/register', register);
app.post('/user', user);
app.use('/', index);

// App Set //
app.set('port', (process.env.PORT || 5000));

app.get("/*", function(req, res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});
// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: ", app.get("port"));
});
