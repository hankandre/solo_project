var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var stravaStrategy = require('passport-strava-oauth2').Strategy;
var encryptLib = require('./encryption');
var db = require('./connection');

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;


passport.serializeUser(function(user, done) {
  console.log('serializeUser user parameter ', user);
  done(null, user.login_id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser id ', id);

  db.one('SELECT login.id AS login_id, companies.id AS company_id, users.id AS users_id, * FROM login ' +
    'JOIN users ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.id = $1',
    [id])
    .then(function (data) {
      var user = data;
      done(null, user);
    })
    .catch(function (error) {
      console.log('Error deserializing user ', error);
      done(null, false);
    });

  // pg.connect(connection, function(err, client) {
  //   if(err) {
  //     done();
  //     console.log('Error connecting to DB while running deserializeUser ', err);
  //   } else {
  //     var user = {};
  //     // JOIN users ON (login.id = users.login_id) JOIN companies ON (users.company_id = companies.id) WHERE
  //     var query = client.query('SELECT login.id AS login_id, companies.id AS company_id, users.id AS users_id, *' +
  //                             ' FROM login JOIN users ON (users.login_id = login.id) JOIN companies ON (users.company_id = companies.id) WHERE login.id = $1', [id]);
  //
  //     query.on('row', function(row) {
  //       console.log('user object ', row);
  //       user = row;
  //       done(null, user)
  //     });
  //
  //     query.on('end', function() {
  //       client.end();
  //     });
  //   }
  // });
});

passport.use('local', new localStrategy ({
  passReqToCallback: true,
  usernameField: 'email'
  }, function(req, email, password, done) {

  db.one('SELECT * FROM login JOIN users ON (users.login_id = login.id) JOIN companies ON ' +
    '(users.company_id = companies.id) WHERE login.email = $1', [email])
    .then(function (user) {
      console.log(user);

      if(encryptLib.comparePassword(password, user.password)) {
        console.log('Password matched!');
        done(null, user);
      }
      else {
        console.log('No password matched.');
        done(null, false, {message: 'Incorrect credentials'});
      }
    })
    .catch(function (error) {
      console.log('error using passport local strategy ', error);
      done(null, false);
    });

}));


passport.use('strava', new stravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: "https://guarded-atoll-32268.herokuapp.com/auth/strava/callback"
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


      db.none('UPDATE users SET strava_id = $1, strava_pic = $2 WHERE login_id = (SELECT id FROM login WHERE email = $3)',
        [stravaInfo.id, stravaInfo.pic, stravaInfo.email])
        .then(function () {
          console.log('Success entering strava data');
          db.one('SELECT * FROM login JOIN users on (login.id = users.login_id) WHERE email = $1;',
          [stravaInfo.email])
            .then(function (data) {
              var user = data;
              console.log('Success finding strava user!');
              done(null, user);
            })
            .catch(function (error) {
              console.log('Error finding strava user.', error);
            });
        })
        .catch(function (error) {
          console.log('Error inputing strava data ', error);
        });
    });
}));

module.exports = passport;
