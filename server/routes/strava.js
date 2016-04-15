var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');


router.get('/',
  passport.authenticate('strava'),
  function(req, res) {
    console.log(req.body);
  }
);

router.get('/callback',
  passport.authenticate('strava'),
  { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../../views/home.html');
});


module.exports = router;
