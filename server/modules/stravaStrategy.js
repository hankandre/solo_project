var router = require('express').Router();
var passport = require('passport');


router.get('/',
  passport.authenticate('strava', {scope: ['public']})
);

router.get('/callback',
  passport.authenticate('strava',{ failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../../views/home.html');
  }
);


module.exports = router;
