var express = require('express');
var router = express.Router();


app.get('/',
  passport.authenticate('strava'));

app.get('/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
