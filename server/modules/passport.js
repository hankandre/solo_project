var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var stravaStrategy = require('passport-strava-oauth2').Strategy;
var encryptLib = require('./encryption');
var connection = require('./db');
var pg = require('pg');

var STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
var STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  console.log('serializeUser user parameter ', user);
  done(null, user.login_id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser id ', id);

  pg.connect(connection, function(err, client) {
    if(err) {
      done();
      console.log('Error connecting to DB while running deserializeUser ', err);
    } else {
      var user = {};
      // JOIN users ON (login.id = users.login_id) JOIN companies ON (users.company_id = companies.id) WHERE
      var query = client.query('SELECT login.id AS login_id, companies.id AS company_id, users.id AS users_id, *' +
                              ' FROM login JOIN users ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.id = $1', [id]);

      query.on('row', function(row) {
        console.log('user object ', row);
        user = row;
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
    pg.connect(connection, function(err, client) {
      if (err) {
        console.log('Error connecting to db ', err);
      } else {
        console.log('Called local sql Passport strategy.', email);

        var user = {};
        var query = client.query('SELECT * FROM login JOIN users ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.email = $1', [email]);

        query.on('row', function(row) {
          console.log('localStrategy row ', row);
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
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/strava/callback"
  },
  function(accessToken, refreshToken, stravaProfile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(stravaProfile);
      var stravaInfo = {
        id: stravaProfile._json.id,
        email: stravaProfile._json.email,
        pic: stravaProfile._json.profile_medium
      };

      console.log('stravaInfo ', stravaInfo);

      pg.connect(connection, function(err, client, finished) {
        if (err) {
          console.log('Error connecting to db for Strava input', err);
        } else {
          var loginInfo = {};
          var query = client.query('SELECT id AS login_id, * FROM login WHERE email = $1', [stravaInfo.email]);

          query.on('row', function(row) {
            loginInfo = row;
            console.log('strava strategy SELECT login, ', loginInfo);
            query = client.query('UPDATE users ' +
                                  'SET strava_id = $2, ' +
                                  'strava_pic = $3 ' +
                                  'WHERE login_id = $1 ' +
                                  'RETURNING strava_id, strava_pic;',
                                  [loginInfo.id, stravaInfo.id, stravaInfo.pic]);

            query.on('row', function(row) {
              console.log('Strava insert data ', row);
              finished();
            });

            query.on('end', function() {
              finished();
            });

            query.on('error', function(error) {
              console.log('Error inserting into Strava table ', error);
              finished();
            });
          });

          query.on('end', function() {
            finished();
            done(null, loginInfo);
          });

          query.on('error', function(error) {
            console.log('Error retreiving info for Strava match ', error);
            finished();
          });

        }
      });
      // To keep the example simple, the user's Strava profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Strava account with a user record in your database,
      // and return that user instead.
    });
  }
));

module.exports = passport;
