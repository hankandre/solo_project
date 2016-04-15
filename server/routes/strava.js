var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


app.get('/',
  passport.authenticate('strava'));

app.get('/callback',
  passport.authenticate('strava'),
  function(req, res) {
    console.log(req.body);
    res.redirect('/');
  });


module.exports = router;
