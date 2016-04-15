var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var stravaStrategy = require('passport-strava-oauth2').Strategy;
var encryptLib = require('./encryption');
var connection = require('./db');
var pg = require('pg');

passport.serializeUser(function(user, done) {
  console.log('serializeUser user ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('called deserializeUser', id);

  pg.connect(connection, function(err, client) {
    if(err) {
      done();
      console.log('Error connecting to DB while running deserializeUser ', err);
    } else {
      var user = {};
      // JOIN users ON (login.id = users.login_id) JOIN companies ON (users.company_id = companies.id) WHERE
      var query = client.query('SELECT * FROM login JOIN users ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.id = $1', [id]);

      query.on('row', function(row) {
        user = row;
        console.log('User row ', user);
        done(null, user)
      });

      query.on('end', function() {
        client.end();
      });
    }
  });
});

passport.use('local', new localStrategy ({
  passReqToCallback: true,
  usernameField: 'email'
  }, function(req, email, password, done) {
    console.log('email ', email);
    pg.connect(connection, function(err, client) {
      if (err) {
        console.log('Error connecting to db ', err);
      } else {
        console.log('Called local sql Passport strategy.');

        var user = {};
        var query = client.query('SELECT * FROM login JOIN users ON (login.id = users.login_id) WHERE email = $1', [email]);

        query.on('row', function(row) {
          console.log('User obj ', row);
          user = row;

          if(encryptLib.comparePassword(password, user.password)) {
            console.log('Password matched!');
            done(null, user);
          } else {
            console.log('No password matched.');
            done(null, false, {message: 'Incorrect credentials'});
          }
        });

        query.on('end', function() {
          client.end();
        });
      }
    });
}));


passport.use('strava', new stravaStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/strava/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('Strava profile ', profile);
      // To keep the example simple, the user's Strava profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Strava account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = passport;
